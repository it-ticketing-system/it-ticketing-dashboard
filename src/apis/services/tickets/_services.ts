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
} from './_mappers';
import type {
  GetManagementTicketsRequest,
  GetManagementTicketsResponse,
  GetTicketDetailsResponse,
  SendTicketMessageRequest,
  SendTicketMessageResult,
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

  return {
    getTickets,
    getTicketDetails,
    sendTicketMessage,
  };
}
