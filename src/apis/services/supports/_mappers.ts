import type { SupportListItemDTO, SupportDetailsDTO } from './_dto';
import type { ISupportListItem, ISupportDetails } from '@/models';

export const mapSupportListItemDTO = (
  dto: SupportListItemDTO,
): ISupportListItem => {
  return {
    id: dto.id,
    name: dto.name,
    username: dto.username,
    departments: dto.departments,
    availabilityStatus: dto.availabilityStatus,
    activeTicketCount: dto.activeTicketCount,
    lastActivityAt: dto.lastActivityAt,
  };
};

export const mapSupportDetailsDTO = (
  dto: SupportDetailsDTO,
): ISupportDetails => {
  return {
    id: dto.id,
    name: dto.name,
    username: dto.username,
    role: dto.role,
    departments: dto.departments,
    availabilityStatus: dto.availabilityStatus,
    permissions: dto.permissions,
    createdAt: dto.createdAt,
  };
};
