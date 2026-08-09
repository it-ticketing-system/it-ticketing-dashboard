import type { IAuthUser, IUser } from '@/models';

export interface LoginRequest {
  username: string;
  password: string;
}

export type LoginResult = IAuthUser;

export interface LogoutResult {
  message: string;
}

export type GetMeResponse = IUser;
