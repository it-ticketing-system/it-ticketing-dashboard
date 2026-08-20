'use client';

import { clientApiRequest } from '@/apis/core/client/api-request';
import { createAuthServices } from './_services';

export const clientAuthServices = createAuthServices(clientApiRequest);

export type {
  LoginRequest,
  LoginResult,
  LogoutResult,
  GetMeResponse,
  UpdateProfileRequest,
  UpdateProfileResult,
  ChangePasswordRequest,
  ChangePasswordResult,
} from './_types';
