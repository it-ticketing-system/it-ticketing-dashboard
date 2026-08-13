import type { IDepartmentLookup, ISupportLookup } from '@/models';

export type GetDepartmentsResponse = IDepartmentLookup[];

export interface GetSupportsRequest {
  departmentId?: string;
  availabilityStatus?: string;
}

export type GetSupportsResponse = ISupportLookup[];
