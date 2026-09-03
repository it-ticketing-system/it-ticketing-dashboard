interface TicketDepartmentDto {
  id: number;
  name: string;
}

export type TicketStatusDto =
  'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_USER' | 'RESOLVED' | 'CLOSED';

interface TicketUserDto {
  id: number;
  name: string;
  username: string;
}

interface TicketSupportDto {
  id: number;
  name: string;
}

export interface ManagementTicketListItemDto {
  id: number;
  ticketNumber: string;
  title: string;
  user: TicketUserDto;
  assignedSupport: TicketSupportDto | null;
  department: TicketDepartmentDto;
  status: TicketStatusDto;
  createdAt: string;
  updatedAt: string;
}

export interface GetManagementTicketsRequestDto {
  page?: number;
  perPage?: number;
  search?: string;
  departmentId?: number;
  status?: TicketStatusDto;
  supportId?: number;
  user?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}

interface TicketFileDto {
  id: number;
  originalName: string;
  mimeType?: string;
  size?: number;
  url: string;
}

interface TicketMessageSenderDto {
  id: number;
  name: string;
  username?: string;
  role: 'USER' | 'SUPPORT' | 'ADMIN';
  profileImageUrl: string | null;
}

export type TicketHistoryActorRoleDto = 'USER' | 'SUPPORT' | 'ADMIN' | 'SYSTEM';

type TicketHistoryActorDto = {
  id: number | null;
  name: string;
  username?: string;
  role: TicketHistoryActorRoleDto;
  profileImageUrl?: string | null;
};

export type TicketAssignmentTypeDto = 'ASSIGN_SUPPORT' | 'ASSIGN_AUTO';

export interface TicketMessageDto {
  id: number;
  body: string;
  sender: TicketMessageSenderDto;
  files: TicketFileDto[];
  createdAt: string;
}

export interface ManagementTicketDetailsDto {
  id: number;
  ticketNumber: string;
  title: string;
  department: TicketDepartmentDto;
  status: TicketStatusDto;
  user: TicketUserDto;
  assignedSupport: TicketSupportDto | null;
  createdAt: string;
  updatedAt: string;
  availableActions: TicketAvailableActionsDto;
  messages: TicketMessageDto[];
}

export interface TicketAvailableActionsDto {
  canReply: boolean;
  canChangeStatus: boolean;
  canChangeDepartment: boolean;
  canChangeAssignment: boolean;
}

export interface SendTicketMessageRequestDto {
  body: string;
  fileIds: number[];
}

export type SendTicketMessageResponseDto = TicketMessageDto;

export interface ChangeTicketStatusRequestDto {
  status: TicketStatusDto;
}

export interface ChangeTicketAssignmentRequestDto {
  supportId: number;
}

export interface ChangeTicketDepartmentRequestDto {
  departmentId: number;
}

export interface ChangeTicketStatusResultDto {
  id: number;
  oldStatus: TicketStatusDto;
  newStatus: TicketStatusDto;
  changedBy: TicketHistoryActorDto;
  createdAt: string; // The API docs uses changedAt in some, createdAt in others. I'll map it securely
  changedAt?: string;
}

export interface ChangeTicketAssignmentResultDto {
  id: number;
  oldSupport?: TicketSupportDto | null;
  newSupport?: TicketSupportDto | null;
  fromSupport?: TicketSupportDto | null;
  toSupport?: TicketSupportDto | null;
  assignmentType?: TicketAssignmentTypeDto;
  changedBy: TicketHistoryActorDto;
  createdAt: string;
  changedAt?: string;
}

export interface ChangeTicketDepartmentResultDto {
  id: number;
  oldDepartment: TicketDepartmentDto;
  newDepartment: TicketDepartmentDto;
  changedBy: TicketHistoryActorDto;
  createdAt: string;
  changedAt?: string;
}

export type GetTicketStatusHistoryResponseDto = ChangeTicketStatusResultDto[];
export type GetTicketAssignmentHistoryResponseDto =
  ChangeTicketAssignmentResultDto[];
export type GetTicketDepartmentHistoryResponseDto =
  ChangeTicketDepartmentResultDto[];
