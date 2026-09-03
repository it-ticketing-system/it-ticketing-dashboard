export type { IAuthUser } from './auth';
export type { IUser, IUserDepartment, UserRole, IUserListItem } from './user';
export type { IUploadedFile } from './file';
export type { IDepartmentLookup, ISupportLookup } from './lookup';

export type {
  ITicket,
  ITicketMessage,
  TicketStatus,
  TicketMessageSenderRole,
  TicketHistoryActorRole,
  TicketAssignmentType,
  TicketSystemMessageTone,
  ITicketAvailableActions,
  ITicketStatusHistory,
  ITicketAssignmentHistory,
  ITicketDepartmentHistory,
} from './ticket';

export type { ISupportListItem, ISupportDetails } from './support';
export type { IDepartmentListItem, IDepartmentDetails } from './department';
export type {
  INotification,
  INotificationRelatedEntity,
  NotificationTab,
  NotificationType,
} from './notification';
export type {
  IManagementOverviewCards,
  IOverviewTrend,
  IOverviewTrendPoint,
  OverviewTrendRange,
} from './overview';
export type {
  IGeneratedReport,
  IReportCards,
  IReportDepartmentStatistic,
  IReportSupportPerformance,
  IReportTicketTrend,
  IReportTrendPoint,
  ReportGranularity,
  ReportRange,
  ReportType,
} from './report';
