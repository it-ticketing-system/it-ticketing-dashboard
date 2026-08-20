export interface IDepartmentListItem {
  id: number;
  name: string;
  supportCount: number;
  ticketCount: number;
}

export interface IDepartmentDetails {
  id: number;
  name: string;
  supports: { id: number; name: string }[];
  createdAt?: string;
  updatedAt?: string;
}
