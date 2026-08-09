import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME, ROUTES } from '@/constants';
import { AuthLayout } from '@/layouts';

const Layout: FCC = async ({ children }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (accessToken) {
    redirect(ROUTES.home);
  }

  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
