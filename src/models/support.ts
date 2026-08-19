export interface ISupportListItem {
  id: number;
  name: string;
  username: string;
  departments: { id: number; name: string }[];
  availabilityStatus: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  activeTicketCount: number;
  lastActivityAt: string | null;
}

export interface ISupportDetails {
  id: number;
  name: string;
  username: string;
  role: 'SUPPORT';
  departments: { id: number; name: string }[];
  availabilityStatus: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE';
  permissions: string[];
  createdAt: string;
}
