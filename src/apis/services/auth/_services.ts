import { AUTH_ENDPOINTS } from './_endpoints';
import { toUserModel } from './_mappers';
import {
  type GetMeResponse,
  type LoginRequest,
  type LoginResult,
  type LogoutResult,
} from './_types';
import type {
  GetMeResponseDto,
  LoginRequestDto,
  LoginResponseDto,
  LogoutResponseDto,
} from './_dto';
import type { ApiRequestFunction } from '@/apis/core/types/api-request.types';

export function createAuthServices(request: ApiRequestFunction) {
  async function login(payload: LoginRequest): Promise<LoginResult> {
    const dto = await request<LoginResponseDto, LoginRequestDto>({
      url: AUTH_ENDPOINTS.login,
      method: 'POST',
      data: payload,
      meta: {
        auth: 'none',
      },
    });

    return toUserModel(dto.user);
  }

  async function getMe(signal?: AbortSignal): Promise<GetMeResponse> {
    const dto = await request<GetMeResponseDto>({
      url: AUTH_ENDPOINTS.me,
      method: 'GET',
      signal,
      meta: {
        auth: 'required',
      },
    });

    return toUserModel(dto);
  }

  async function logout(): Promise<LogoutResult> {
    return request<LogoutResponseDto, Record<string, never>>({
      url: AUTH_ENDPOINTS.logout,
      method: 'POST',
      data: {},
      meta: {
        auth: 'required',
        skipUnauthorizedRedirect: true,
      },
    });
  }

  return {
    login,
    getMe,
    logout,
  };
}
