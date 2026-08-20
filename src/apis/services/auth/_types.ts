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

export interface UpdateProfileRequest {
  name?: string;
  username?: string;
  profileImageFileId?: number;
}

export type UpdateProfileResult = IUser;

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface ChangePasswordResult {
  message: string;
}
