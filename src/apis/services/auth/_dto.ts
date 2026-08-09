export type AuthUserRoleDto = 'USER' | 'SUPPORT' | 'ADMIN';

export type SupportAvailabilityStatusDto =
  'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';

export interface AuthDepartmentDto {
  id: number;
  name: string;
}

export interface AuthUserDto {
  id: number;
  name: string;
  username: string;
  role: AuthUserRoleDto;
  profileImageUrl: string | null;
  permissions?: string[];
  departments?: AuthDepartmentDto[];
  availabilityStatus?: SupportAvailabilityStatusDto;
  createdAt?: string;
  lastLoginAt?: string | null;
}

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken?: string;
  tokenType: 'Bearer';
  user: AuthUserDto;
}

export interface LogoutResponseDto {
  message: string;
}

export type GetMeResponseDto = AuthUserDto;
