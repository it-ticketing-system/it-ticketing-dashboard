export interface DepartmentListItemDto {
  id: number;
  name: string;
  supportCount: number;
  ticketCount: number;
}

export interface DepartmentDetailsDto {
  id: number;
  name: string;
  supports: { id: number; name: string }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDepartmentRequestDto {
  name: string;
  supportIds: number[];
}

export interface UpdateDepartmentRequestDto {
  name: string;
  supportIds: number[];
}
