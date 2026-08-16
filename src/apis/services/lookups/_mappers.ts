import type { DepartmentLookupDto, SupportLookupDto } from './_dto';
import type { IDepartmentLookup, ISupportLookup } from '@/models';

export const toDepartmentLookup = (
  department: DepartmentLookupDto,
): IDepartmentLookup => ({
  id: String(department.id),
  name: department.name,
});

export const toSupportLookup = (support: SupportLookupDto): ISupportLookup => ({
  id: String(support.id),
  name: support.name,
});
