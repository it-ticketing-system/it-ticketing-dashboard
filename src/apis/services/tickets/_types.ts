import type { PaginatedResult } from '@/apis/core/types/api-response';
import type {
  ITicket,
  ITicketMessage,
  TicketStatus,
  ITicketStatusHistory,
  ITicketAssignmentHistory,
  ITicketDepartmentHistory,
} from '@/models';

export interface GetManagementTicketsRequest {
  page?: number;
  perPage?: number;
  search?: string;
  departmentId?: number;
  status?: TicketStatus;
  supportId?: number;
  userId?: number;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}

export type GetManagementTicketsResponse = PaginatedResult<ITicket>;

export interface GetTicketDetailsResponse {
  ticket: ITicket;
  messages: ITicketMessage[];
}

export interface SendTicketMessageRequest {
  body: string;
  fileIds: number[];
}

export type SendTicketMessageResult = ITicketMessage;

export interface ChangeTicketStatusRequest {
  status: TicketStatus;
}
export type ChangeTicketStatusResult = void;

export interface ChangeTicketAssignmentRequest {
  supportId: string;
}
export type ChangeTicketAssignmentResult = void;

export interface ChangeTicketDepartmentRequest {
  departmentId: string;
}
export type ChangeTicketDepartmentResult = void;

export type GetTicketStatusHistoryResponse = ITicketStatusHistory[];
export type GetTicketAssignmentHistoryResponse = ITicketAssignmentHistory[];
export type GetTicketDepartmentHistoryResponse = ITicketDepartmentHistory[];
