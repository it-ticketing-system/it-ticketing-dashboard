const TICKET_LISTS_QUERY_KEY = ['tickets', 'list'] as const;

export const QUERY_KEYS = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  lookups: {
    departments: ['lookups', 'departments'] as const,
    supports: (params?: Record<string, unknown>) =>
      ['lookups', 'supports', params] as const,
  },
  tickets: {
    lists: TICKET_LISTS_QUERY_KEY,
    list: (params: {
      page: number;
      perPage: number;
      search?: string;
      status?: string;
      departmentId?: number;
      from?: string;
      to?: string;
    }) => [...TICKET_LISTS_QUERY_KEY, params] as const,
    details: (ticketId: string) => ['tickets', 'details', ticketId] as const,
    statusHistory: (ticketId: string) =>
      ['tickets', 'status-history', ticketId] as const,
    assignmentHistory: (ticketId: string) =>
      ['tickets', 'assignment-history', ticketId] as const,
    departmentHistory: (ticketId: string) =>
      ['tickets', 'department-history', ticketId] as const,
  },
  users: {
    lists: ['users', 'list'] as const,
    list: (params: { page?: number; perPage?: number; search?: string }) =>
      ['users', 'list', params] as const,
  },
  notifications: {
    root: ['notifications'] as const,
    lists: ['notifications', 'list'] as const,
    list: (params?: Record<string, unknown>) =>
      ['notifications', 'list', params] as const,
    unreadCount: ['notifications', 'unread-count'] as const,
  },
  managementOverview: {
    cards: ['management-overview', 'cards'] as const,
    trend: (range: string) => ['management-overview', 'trend', range] as const,
  },
} as const;
