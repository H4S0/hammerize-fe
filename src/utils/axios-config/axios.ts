import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { BE_URL, getValidToken, refreshApi } from './get-valid-token';
import { setAccessToken, clearUser } from '../auth/auth-storage';

const PUBLIC_URLS = ['/auth/login', '/auth/register'];

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  error?: string | null;
  data: T | null;
  status?: StatusCodes;
};

interface ExtendedInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface TypedAxiosInstance extends AxiosInstance {
  get<T, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  post<T, D = unknown, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T, D = unknown, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patch<T, D = unknown, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R>;
  delete<T, R = AxiosResponse<ApiResponse<T>>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

export const api: TypedAxiosInstance = axios.create({
  baseURL: BE_URL,
  withCredentials: true,
}) as TypedAxiosInstance;

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any = null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  failedQueue = [];
};

const stringifyError = (err: unknown) => {
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};

api.interceptors.request.use(
  async (config) => {
    const isPublicRoute = PUBLIC_URLS.some((url) => config.url?.endsWith(url));

    if (isPublicRoute || config.url?.includes('/verify/refresh-token')) {
      return config;
    }

    const token = await getValidToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config! as ExtendedInternalAxiosRequestConfig;
    const res = error.response;

    // Logika za parsiranje odgovora (API Error Format)
    const backendResponse: ApiResponse<unknown> | null =
      res?.data && typeof res.data === 'object' && 'message' in res.data
        ? (res.data as ApiResponse<unknown>)
        : null;

    // 1. Provera javne rute (ako ne uspe poziv ka /login ili /register)
    const isPublicRoute = PUBLIC_URLS.some((url) =>
      originalRequest.url?.endsWith(url)
    );

    if (isPublicRoute) {
      return Promise.reject(backendResponse || error.response?.data || error);
    }

    // 2. Detekcija isteka tokena na osnovu backend odgovora
    const statusCode =
      res?.status ??
      backendResponse?.status ??
      StatusCodes.INTERNAL_SERVER_ERROR;

    const isTokenExpiredResponse =
      statusCode === StatusCodes.UNAUTHORIZED || // Ako je status 401
      (backendResponse &&
        backendResponse.status === StatusCodes.UNAUTHORIZED) || // Ako backend JSON body ima status 401
      backendResponse?.message?.includes('Invalid or expired token'); // Ako poruka sadrži ključnu frazu

    const shouldAttemptRefresh =
      isTokenExpiredResponse &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/verify/refresh-token');

    if (shouldAttemptRefresh) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers!.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshApi.post<
          ApiResponse<{ accessToken: string }>
        >('/verify/refresh-token');

        if (response.data.success && response.data.data?.accessToken) {
          const newToken = response.data.data.accessToken;
          setAccessToken(newToken);

          processQueue(null, newToken);

          originalRequest.headers!.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          throw new Error('Refresh token failed - no access token in response');
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearUser();

        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.includes('/login')
        ) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } // 3. RUKOVANJE OSTALIM GREŠKAMA

    if (backendResponse) {
      // Vraćanje JSON objekta greške koji je došao iz backend-a
      return Promise.reject(backendResponse);
    } // Fallback za ne-JSON greške (npr. mreža, CORS, timeout)

    let message: string;
    const finalStatusCode =
      error.response?.status || StatusCodes.INTERNAL_SERVER_ERROR;

    if (finalStatusCode >= 500) {
      message = 'Something went wrong, please contact support!';
    } else if (finalStatusCode) {
      message = getReasonPhrase(finalStatusCode);
    } else {
      message = 'Network error or request failed to complete.';
    }

    const finalErrorResponse: ApiResponse<null> = {
      success: false,
      message,
      error: stringifyError(error),
      data: null,
      status: finalStatusCode,
    };

    return Promise.reject(finalErrorResponse);
  }
);

export function isApiResponse(error: any): error is ApiResponse<any> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' in error &&
    'message' in error
  );
}
