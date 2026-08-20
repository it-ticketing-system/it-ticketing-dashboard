import { IDepartmentListItem, IDepartmentDetails } from '@/models';
import type { DepartmentListItemDto, DepartmentDetailsDto } from './_dto';

export function toDepartmentListItem(dto: DepartmentListItemDto): IDepartmentListItem {
  return {
    id: dto.id,
    name: dto.name,
    supportCount: dto.supportCount,
    ticketCount: dto.ticketCount,
  };
}

export function toDepartmentDetails(dto: DepartmentDetailsDto): IDepartmentDetails {
  return {
    id: dto.id,
    name: dto.name,
    supports: dto.supports.map(support => ({
      id: support.id,
      name: support.name,
    })),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
