import type { IUploadedFile } from './file';

export type TicketStatus =
  'open' | 'inProgress' | 'waitingUser' | 'resolved' | 'closed';
type TicketMessageType = 'user' | 'support' | 'system';
export type TicketMessageSenderRole = 'USER' | 'SUPPORT' | 'ADMIN';
export type TicketSystemMessageTone = 'info' | 'warning' | 'neutral';
export type TicketHistoryActorRole = 'user' | 'support' | 'admin' | 'system';
export type TicketAssignmentType = 'assignSupport' | 'assignAuto';

export interface ITicketMessage {
  id: string;
  type: TicketMessageType;
  senderId: string;
  senderRole?: TicketMessageSenderRole;
  senderName?: string;
  senderAvatarUrl?: string;
  body: string;
  createdAtLabel: string;
  attachments?: IUploadedFile[];
  systemTone?: TicketSystemMessageTone;
}

export interface ITicket {
  id: string;
  ticketNumber: string;
  title: string;
  departmentId: string;
  departmentName: string;
  status: TicketStatus;
  lastUpdatedLabel: string;
  detailsHref: string;
  createdAtLabel: string;
  user: {
    id: string;
    name: string;
    username: string;
  };
  assignedSupport: {
    id: string;
    name: string;
  } | null;
  availableActions?: ITicketAvailableActions;
}

export interface ITicketAvailableActions {
  canReply: boolean;
  canChangeStatus: boolean;
  canChangeDepartment: boolean;
  canChangeAssignment: boolean;
}

export interface ITicketStatusHistory {
  id: string;
  oldStatus: TicketStatus;
  newStatus: TicketStatus;
  changedByName: string;
  changedByRole: TicketHistoryActorRole;
  createdAtLabel: string;
}

export interface ITicketAssignmentHistory {
  id: string;
  fromSupportName?: string;
  toSupportName?: string;
  assignmentType?: TicketAssignmentType;
  changedByName: string;
  changedByRole: TicketHistoryActorRole;
  createdAtLabel: string;
}

export interface ITicketDepartmentHistory {
  id: string;
  oldDepartmentName: string;
  newDepartmentName: string;
  changedByName: string;
  changedByRole: TicketHistoryActorRole;
  createdAtLabel: string;
}
