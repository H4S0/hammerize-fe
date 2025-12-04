import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import type z from 'zod';
import { api } from '../axios-config/axios';
import {
  type User,
  clearUser,
  getStoredUser,
  setStoredUser,
} from './auth-storage';
import { LoginSchema } from '../api/user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loginUser: (data: z.infer<typeof LoginSchema>) => Promise<void | null>;
  logout: () => Promise<void>;
  refetchUser: () => Promise<User | null>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const isAuthenticated = !!user;
  const { toast } = useToast();

  const refetchUser = useCallback(async () => {
    try {
      const res = await api.post<User>('/verify/refresh-token');
      const updatedUser = res.data.data;

      setUser(updatedUser);
      setStoredUser(updatedUser);

      return updatedUser;
    } catch {
      setUser(null);
      clearUser();
      return null;
    }
  }, []);

  const loginUser = useCallback(
    async (data: z.infer<typeof LoginSchema>) => {
      const res = await login(data);

      if (!res.success) {
        return toast({
          title: res.message,
          variant: 'destructive',
        });
      }

      toast({
        title: res.message,
        variant: 'success',
      });

      setUser(res.data);
      setStoredUser(res.data);
    },
    [toast]
  );

  const logout = useCallback(async () => {
    try {
      await api.post('/user/logout');
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
      setStoredUser(null);
      clearUser();
    }
  }, []);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loginUser, logout, refetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
