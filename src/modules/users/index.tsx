import { connection } from 'next/server';
import { Suspense } from 'react';
import UsersClientFallback from './skeleton/users-client-fallback';
import UsersClient from './users-client';
import { getUsersInitialData } from './users.server';
import type { UsersSearchParams } from './users-query';

type UsersModuleProps = {
  searchParams: Promise<UsersSearchParams>;
};

const UsersModule = async ({ searchParams }: UsersModuleProps) => {
  await connection();
  const usersInitialData = await getUsersInitialData(await searchParams);

  return (
      <Suspense fallback={<UsersClientFallback />}>
        <UsersClient {...usersInitialData} />
      </Suspense>
  );
};

export default UsersModule;
