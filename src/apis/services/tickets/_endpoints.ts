export const TICKET_ENDPOINTS = {
  myTickets: '/management/tickets',
  createTicket: '/management/tickets',
  ticketDetails: (ticketId: string) => `/management/tickets/${ticketId}`,
  ticketMessages: (ticketId: string) => `/management/tickets/${ticketId}/messages`,
} as const;
