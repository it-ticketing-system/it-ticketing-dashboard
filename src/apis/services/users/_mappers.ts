import type { UserResponseDto } from './_dto';
import type { IUserListItem } from '@/models';

export const mapUserResponseToModel = (
  dto: UserResponseDto,
): IUserListItem => ({
  id: dto.id,
  name: dto.name,
  username: dto.username,
  ticketCount: dto.ticketCount,
  createdAt: dto.createdAt,
});
