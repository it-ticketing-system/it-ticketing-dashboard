import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME, ROUTES } from '@/constants';
import { DashboardLayout } from '@/layouts';
import { AuthProvider } from '@/providers';

const ProtectedLayout: FCC = async ({ children }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!accessToken) {
    redirect(ROUTES.login);
  }

  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  );
};

export default ProtectedLayout;
