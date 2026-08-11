import { ROUTES } from '@/constants';
import {
  formatPersianDateTime,
  formatPersianRelativeDateTime,
  toBackendProxyHref,
} from '@/utils';
import type {
  GetManagementTicketsRequestDto,
  ManagementTicketDetailsDto,
  ManagementTicketListItemDto,
  SendTicketMessageRequestDto,
  TicketMessageDto,
  TicketStatusDto,
} from './_dto';
import type {
  GetManagementTicketsRequest,
  SendTicketMessageRequest,
} from './_types';
import type { ITicket, ITicketMessage, TicketStatus } from '@/models';

const TICKET_STATUS_MAP = {
  OPEN: 'open',
  IN_PROGRESS: 'inProgress',
  WAITING_FOR_USER: 'waitingUser',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
} as const satisfies Record<TicketStatusDto, TicketStatus>;

const TICKET_STATUS_DTO_MAP = {
  open: 'OPEN',
  inProgress: 'IN_PROGRESS',
  waitingUser: 'WAITING_FOR_USER',
  resolved: 'RESOLVED',
  closed: 'CLOSED',
} as const satisfies Record<TicketStatus, TicketStatusDto>;

export const toGetManagementTicketsRequestDto = (
  params: GetManagementTicketsRequest,
): GetManagementTicketsRequestDto => ({
  ...params,
  status: params.status ? TICKET_STATUS_DTO_MAP[params.status] : undefined,
});

export const toSendTicketMessageRequestDto = (
  payload: SendTicketMessageRequest,
): SendTicketMessageRequestDto => ({
  body: payload.body,
  fileIds: payload.fileIds,
});

export const toTicketListItem = (ticket: ManagementTicketListItemDto): ITicket => ({
  id: String(ticket.id),
  ticketNumber: ticket.ticketNumber,
  title: ticket.title,
  departmentName: ticket.department.name,
  status: TICKET_STATUS_MAP[ticket.status],
  lastUpdatedLabel: formatPersianRelativeDateTime(ticket.updatedAt),
  createdAtLabel: formatPersianDateTime(ticket.createdAt),
  detailsHref: ROUTES.ticketDetails(String(ticket.id)),
  user: {
    id: String(ticket.user.id),
    name: ticket.user.name,
    username: ticket.user.username,
  },
  assignedSupport: ticket.assignedSupport
    ? {
        id: String(ticket.assignedSupport.id),
        name: ticket.assignedSupport.name,
      }
    : null,
});

export const toTicket = (ticket: ManagementTicketDetailsDto): ITicket => ({
  id: String(ticket.id),
  ticketNumber: ticket.ticketNumber,
  title: ticket.title,
  departmentName: ticket.department.name,
  status: TICKET_STATUS_MAP[ticket.status],
  createdAtLabel: formatPersianDateTime(ticket.createdAt),
  lastUpdatedLabel: formatPersianRelativeDateTime(ticket.updatedAt),
  detailsHref: ROUTES.ticketDetails(String(ticket.id)),
  user: {
    id: String(ticket.user.id),
    name: ticket.user.name,
    username: ticket.user.username,
  },
  assignedSupport: ticket.assignedSupport
    ? {
        id: String(ticket.assignedSupport.id),
        name: ticket.assignedSupport.name,
      }
    : null,
});

export const toTicketMessage = (
  message: TicketMessageDto,
): ITicketMessage => {
  const isUser = message.sender.role === 'USER';

  return {
    id: String(message.id),
    type: isUser ? 'user' : 'support',
    senderName: message.sender.name,
    senderAvatarUrl: message.sender.profileImageUrl
      ? toBackendProxyHref(message.sender.profileImageUrl)
      : undefined,
    body: message.body,
    createdAtLabel: formatPersianDateTime(message.createdAt),
    attachments: message.files.map((file) => ({
      id: file.id,
      name: file.originalName,
      size: file.size ?? 0,
      href: toBackendProxyHref(file.url),
      mimeType: file.mimeType ?? '',
      createdAt: message.createdAt,
    })),
  };
};
