import z from 'zod';
import { api } from '../axios-config/axios';
import { createSHA512Hash } from '../auth/hashing';
import { User } from '../auth/auth-storage';

const RoleEnum = z.enum(['user', 'admin']);

export const UserSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.email(),
  role: RoleEnum,
  accessToken: z.string(),
});

export const RegisterSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string(),
});

export async function register(data: z.infer<typeof RegisterSchema>) {
  const hashedPassword = await createSHA512Hash(data.password);
  const res = await api.post('/auth/register', {
    ...data,
    password: hashedPassword,
  });

  return res.data;
}

export const LoginSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: z.string('Password is required').min(1),
});

export interface LoginResponse {
  data: User;
}

export async function login(data: z.infer<typeof LoginSchema>) {
  const hashedPassword = await createSHA512Hash(data.password);

  const res = await api.post<User>('/auth/login', {
    ...data,
    password: hashedPassword,
  });

  return res.data;
}

export const InitPasswordResetSchema = z.object({
  email: z.email(),
});

export async function initPasswordReset(
  data: z.infer<typeof InitPasswordResetSchema>
) {
  const res = await api.put('/auth/init-forget-password', data);
  return res.data;
}

export const NewPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export async function newPassword(
  token: string,
  data: z.infer<typeof NewPasswordSchema>
) {
  const hashedPassword = await createSHA512Hash(data.password);
  const hashedConfirmPassword = await createSHA512Hash(data.confirmPassword);

  const res = await api.put(`/auth/new-password/${token}`, {
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });
  return res.data;
}

export const UsernameUpdateSchema = z.object({
  username: z.string(),
});

export async function updateUsername(
  data: z.infer<typeof UsernameUpdateSchema>
) {
  const res = await api.put('/user/update-username', data);
  return res.data;
}

export const EmailUpdateSchema = z.object({
  email: z.email(),
  confirmEmail: z.email(),
});

export async function updateEmail(data: z.infer<typeof EmailUpdateSchema>) {
  const res = await api.put('/user/email-update', data);
  return res.data;
}

export const UpdatingPasswordSchema = z.object({
  oldPassword: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function updatePassword(
  data: z.infer<typeof UpdatingPasswordSchema>
) {
  const hashedOldPassword = await createSHA512Hash(data.oldPassword);
  const hashedNewPassword = await createSHA512Hash(data.password);
  const hashedNewConfirmPassword = await createSHA512Hash(data.confirmPassword);

  const res = await api.put('/user/new-password', {
    oldPassword: hashedOldPassword,
    password: hashedNewPassword,
    confirmPassword: hashedNewConfirmPassword,
  });

  return res.data;
}

type UserInfoRes = Omit<User, 'accessToken'> & {
  provider: 'github' | 'discord';
};

export async function fetchUserInfo() {
  const res = await api.get<UserInfoRes>('/user/user-info');
  return res.data;
}

export const UnlinkAndChangeEmailSchema = z.object({
  email: z.email({ error: 'This field is required ' }),
  confirmEmail: z.email({ error: 'Email confirmation should match' }),
  password: z.string({ error: 'This field is required ' }),
  confirmPassword: z.string({ error: 'Password confirmation should match' }),
});

export async function unlinkAndChangeEmail(
  data: z.infer<typeof UnlinkAndChangeEmailSchema>
) {
  const hashedPassword = await createSHA512Hash(data.password);
  const hashedConfirmPassword = await createSHA512Hash(data.confirmPassword);

  const res = await api.put('/user/unlink-change-email', {
    ...data,
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });

  return res.data;
}

export async function unlinkAndSetPassword(
  data: z.infer<typeof NewPasswordSchema>
) {
  const hashedPassword = await createSHA512Hash(data.password);
  const hashedConfirmPassword = await createSHA512Hash(data.confirmPassword);

  const res = await api.put('/user/unlink-set-password', {
    password: hashedPassword,
    confirmPassword: hashedConfirmPassword,
  });

  return res.data;
}
