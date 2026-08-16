export type UsersRequestDto = {
  search?: string;
  page?: number;
  perPage?: number;
};

export type UserResponseDto = {
  id: number;
  name: string;
  username: string;
  ticketCount: number;
  createdAt: string;
};
