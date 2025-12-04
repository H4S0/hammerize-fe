import axios from 'axios';
import { type ApiResponse } from './axios';
import { getAccessToken, setAccessToken } from '../auth/auth-storage';
export const BE_URL = 'http://localhost:3000/api/v1';
export const refreshApi = axios.create({
  baseURL: BE_URL,
  withCredentials: true,
});

export async function getValidToken(): Promise<string | null> {
  const token = getAccessToken();
  if (!token) return null;

  return token;
}

export async function getValidTokenString(): Promise<string | null> {
  const token = await getValidToken();
  if (token) {
    return token;
  }

  try {
    const response = await refreshApi.post<
      ApiResponse<{ accessToken: string }>
    >('/verify/refresh-token');

    if (response.data.success && response.data.data?.accessToken) {
      const newToken = response.data.data.accessToken;
      setAccessToken(newToken);
      return newToken;
    }
    throw new Error(
      'Refresh token response successful, but missing accessToken.'
    );
  } catch (error) {
    clearUser();
    throw error;
  }
}
function clearUser() {
  throw new Error('Function not implemented.');
}
