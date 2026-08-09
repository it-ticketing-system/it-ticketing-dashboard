import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

const HomePage = () => {
  redirect(ROUTES.dashboard);
};

export default HomePage;
