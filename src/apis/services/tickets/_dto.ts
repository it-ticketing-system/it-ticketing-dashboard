interface TicketDepartmentDto {
  id: number;
  name: string;
}

export type TicketStatusDto =
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'WAITING_FOR_USER'
  | 'RESOLVED'
  | 'CLOSED';

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
  userId?: number;
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
  messages: TicketMessageDto[];
}

export interface SendTicketMessageRequestDto {
  body: string;
  fileIds: number[];
}

export type SendTicketMessageResponseDto = TicketMessageDto;
