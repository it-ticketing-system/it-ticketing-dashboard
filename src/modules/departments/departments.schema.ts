import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useDepartmentSchemas = () => {
  const t = useTranslations('departments.validation');

  const createDepartmentSchema = z.object({
    name: z.string().min(2, t('nameMin')),
    supportIds: z.array(z.number()),
  });

  return {
    createDepartmentSchema,
  };
};

export type CreateDepartmentFormValues = {
  name: string;
  supportIds: number[];
};
