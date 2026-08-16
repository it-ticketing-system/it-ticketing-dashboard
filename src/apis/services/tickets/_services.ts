import {
  ApiPaginatedRequestFunction,
  ApiRequestFunction,
} from '@/apis/core/types/api-request.types';
import {
  type GetManagementTicketsRequestDto,
  type SendTicketMessageRequestDto,
  type SendTicketMessageResponseDto,
  type ManagementTicketDetailsDto,
  type ManagementTicketListItemDto,
} from './_dto';
import { TICKET_ENDPOINTS } from './_endpoints';
import {
  toGetManagementTicketsRequestDto,
  toSendTicketMessageRequestDto,
  toTicket,
  toTicketListItem,
  toTicketMessage,
  toTicketStatusHistory,
  toTicketAssignmentHistory,
  toTicketDepartmentHistory,
} from './_mappers';
import type {
  ChangeTicketStatusRequestDto,
  ChangeTicketAssignmentRequestDto,
  ChangeTicketDepartmentRequestDto,
  GetTicketStatusHistoryResponseDto,
  GetTicketAssignmentHistoryResponseDto,
  GetTicketDepartmentHistoryResponseDto,
} from './_dto';
import type {
  GetManagementTicketsRequest,
  GetManagementTicketsResponse,
  GetTicketDetailsResponse,
  SendTicketMessageRequest,
  SendTicketMessageResult,
  ChangeTicketStatusRequest,
  ChangeTicketStatusResult,
  ChangeTicketAssignmentRequest,
  ChangeTicketAssignmentResult,
  ChangeTicketDepartmentRequest,
  ChangeTicketDepartmentResult,
  GetTicketStatusHistoryResponse,
  GetTicketAssignmentHistoryResponse,
  GetTicketDepartmentHistoryResponse,
} from './_types';

export function createTicketServices(
  request: ApiRequestFunction,
  paginatedRequest: ApiPaginatedRequestFunction,
) {
  async function getTickets(
    params: GetManagementTicketsRequest,
    signal?: AbortSignal,
  ): Promise<GetManagementTicketsResponse> {
    const response = await paginatedRequest<
      ManagementTicketListItemDto,
      GetManagementTicketsRequestDto
    >({
      url: TICKET_ENDPOINTS.myTickets,
      method: 'GET',
      params: toGetManagementTicketsRequestDto(params),
      signal,
      meta: {
        auth: 'required',
      },
    });

    return {
      items: response.items.map(toTicketListItem),
      meta: response.meta,
    };
  }

  async function getTicketDetails(
    ticketId: string,
  ): Promise<GetTicketDetailsResponse> {
    const response = await request<ManagementTicketDetailsDto>({
      url: TICKET_ENDPOINTS.ticketDetails(ticketId),
      method: 'GET',
      meta: {
        auth: 'required',
      },
    });

    return {
      ticket: toTicket(response),
      messages: response.messages.map(toTicketMessage),
    };
  }

  async function sendTicketMessage(
    ticketId: string,
    payload: SendTicketMessageRequest,
  ): Promise<SendTicketMessageResult> {
    const response = await request<
      SendTicketMessageResponseDto,
      SendTicketMessageRequestDto
    >({
      url: TICKET_ENDPOINTS.ticketMessages(ticketId),
      method: 'POST',
      data: toSendTicketMessageRequestDto(payload),
      meta: {
        auth: 'required',
      },
    });

    return toTicketMessage(response);
  }

  async function changeTicketStatus(
    ticketId: string,
    payload: ChangeTicketStatusRequest,
  ): Promise<ChangeTicketStatusResult> {
    const statusMap = {
      open: 'OPEN',
      inProgress: 'IN_PROGRESS',
      waitingUser: 'WAITING_FOR_USER',
      resolved: 'RESOLVED',
      closed: 'CLOSED',
    } as const;

    await request<void, ChangeTicketStatusRequestDto>({
      url: TICKET_ENDPOINTS.ticketStatus(ticketId),
      method: 'PATCH',
      data: { status: statusMap[payload.status] },
      meta: { auth: 'required' },
    });
  }

  async function changeTicketAssignment(
    ticketId: string,
    payload: ChangeTicketAssignmentRequest,
  ): Promise<ChangeTicketAssignmentResult> {
    await request<void, ChangeTicketAssignmentRequestDto>({
      url: TICKET_ENDPOINTS.ticketAssignment(ticketId),
      method: 'PATCH',
      data: { supportId: Number(payload.supportId) },
      meta: { auth: 'required' },
    });
  }

  async function changeTicketDepartment(
    ticketId: string,
    payload: ChangeTicketDepartmentRequest,
  ): Promise<ChangeTicketDepartmentResult> {
    await request<void, ChangeTicketDepartmentRequestDto>({
      url: TICKET_ENDPOINTS.ticketDepartment(ticketId),
      method: 'PATCH',
      data: { departmentId: Number(payload.departmentId) },
      meta: { auth: 'required' },
    });
  }

  async function getStatusHistory(
    ticketId: string,
    signal?: AbortSignal,
  ): Promise<GetTicketStatusHistoryResponse> {
    const response = await request<GetTicketStatusHistoryResponseDto>({
      url: TICKET_ENDPOINTS.statusHistory(ticketId),
      method: 'GET',
      signal,
      meta: { auth: 'required' },
    });
    return response.map(toTicketStatusHistory);
  }

  async function getAssignmentHistory(
    ticketId: string,
    signal?: AbortSignal,
  ): Promise<GetTicketAssignmentHistoryResponse> {
    const response = await request<GetTicketAssignmentHistoryResponseDto>({
      url: TICKET_ENDPOINTS.assignmentHistory(ticketId),
      method: 'GET',
      signal,
      meta: { auth: 'required' },
    });
    return response.map(toTicketAssignmentHistory);
  }

  async function getDepartmentHistory(
    ticketId: string,
    signal?: AbortSignal,
  ): Promise<GetTicketDepartmentHistoryResponse> {
    const response = await request<GetTicketDepartmentHistoryResponseDto>({
      url: TICKET_ENDPOINTS.departmentHistory(ticketId),
      method: 'GET',
      signal,
      meta: { auth: 'required' },
    });
    return response.map(toTicketDepartmentHistory);
  }

  return {
    getTickets,
    getTicketDetails,
    sendTicketMessage,
    changeTicketStatus,
    changeTicketAssignment,
    changeTicketDepartment,
    getStatusHistory,
    getAssignmentHistory,
    getDepartmentHistory,
  };
}
