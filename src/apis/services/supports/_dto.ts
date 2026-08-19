export type SupportListItemDTO = {
  id: number;
  name: string;
  username: string;
  departments: { id: number; name: string }[];
  availabilityStatus: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  activeTicketCount: number;
  lastActivityAt: string | null;
};

export type SupportDetailsDTO = {
  id: number;
  name: string;
  username: string;
  role: 'SUPPORT';
  departments: { id: number; name: string }[];
  availabilityStatus: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  permissions: string[];
  createdAt: string;
  passwordChanged?: boolean;
  sessionsInvalidated?: boolean;
  updatedAt?: string;
};

export type CreateSupportRequestDTO = {
  name: string;
  username: string;
  password?: string;
  departmentIds: number[];
  availabilityStatus: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  permissions: string[];
};

export type UpdateSupportRequestDTO = Partial<CreateSupportRequestDTO>;
