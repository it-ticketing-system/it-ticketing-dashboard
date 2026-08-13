export const TICKET_ENDPOINTS = {
  myTickets: '/management/tickets',
  createTicket: '/management/tickets',
  ticketDetails: (ticketId: string) => `/management/tickets/${ticketId}`,
  ticketMessages: (ticketId: string) => `/management/tickets/${ticketId}/messages`,
  ticketStatus: (ticketId: string) => `/management/tickets/${ticketId}/status`,
  ticketAssignment: (ticketId: string) => `/management/tickets/${ticketId}/assignment`,
  ticketDepartment: (ticketId: string) => `/management/tickets/${ticketId}/department`,
  statusHistory: (ticketId: string) => `/management/tickets/${ticketId}/status-history`,
  assignmentHistory: (ticketId: string) => `/management/tickets/${ticketId}/assignment-history`,
  departmentHistory: (ticketId: string) => `/management/tickets/${ticketId}/department-history`,
} as const;
