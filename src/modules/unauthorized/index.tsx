'use client';

import { Button, Card, CardContent } from '@heroui/react';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ICON_SIZE_CLASS, ROUTES } from '@/constants';

const UnauthorizedModule = () => {
  const t = useTranslations('mainLayout.unauthorized');

  return (
    <div className="flex min-h-120 items-center justify-center p-4">
      <Card className="max-w-md border-neutral-200/80 p-6 text-center shadow-xs">
        <CardContent className="flex flex-col items-center gap-4">
          <div className="bg-danger-50 text-danger-500 flex size-14 items-center justify-center rounded-full">
            <ShieldAlert className={ICON_SIZE_CLASS.lg} />
          </div>

          <h2 className="text-h2 text-neutral-900 font-bold">
            {t('title')}
          </h2>

          <p className="text-body-sm text-neutral-600">
            {t('description')}
          </p>

          <Link href={ROUTES.dashboard}>
            <Button variant="primary" className="mt-2 font-semibold">
              {t('backToDashboard')}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnauthorizedModule;
