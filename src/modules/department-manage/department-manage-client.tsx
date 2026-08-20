'use client';

import {
  Input,
  Button,
  TextField,
  Label,
  FieldError,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { clientDepartmentServices } from '@/apis/services/departments/client';
import { SelectSupports } from '@/components/shared';
import { ROUTES } from '@/constants';
import { usePostRequest } from '@/hooks';
import { useDepartmentSchemas, type CreateDepartmentFormValues } from '../departments/departments.schema';
import type { IDepartmentDetails } from '@/models';

type DepartmentManageClientProps = {
  mode: 'add' | 'edit';
  initialData?: Partial<IDepartmentDetails>;
};

const DepartmentManageClient = ({ mode, initialData }: DepartmentManageClientProps) => {
  const t = useTranslations('departments.form');
  const tRoot = useTranslations('departments');
  const router = useRouter();
  const { createDepartmentSchema } = useDepartmentSchemas();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDepartmentFormValues>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: initialData?.name || '',
      supportIds: initialData?.supports?.map((s) => s.id) || [],
    },
  });

  const { mutateAsync: createDepartment, isPending: isCreating } = usePostRequest({
    requestFn: clientDepartmentServices.createDepartment,
    getSuccessDescription: () => t('successAdd'),
  });

  const { mutateAsync: updateDepartment, isPending: isUpdating } = usePostRequest({
    requestFn: (payload: CreateDepartmentFormValues) =>
      clientDepartmentServices.updateDepartment({
        id: initialData!.id!,
        name: payload.name,
        supportIds: payload.supportIds,
      }),
    getSuccessDescription: () => t('successEdit'),
  });

  const onSubmit = async (data: CreateDepartmentFormValues) => {
    try {
      if (mode === 'add') {
        await createDepartment(data);
      } else {
        await updateDepartment(data);
      }

      router.push(ROUTES.departments);
      router.refresh();
    } catch {
      // Error handled by hook
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="border-border bg-surface mx-auto rounded-xl border p-6 shadow-sm">
      <h1 className="text-h3 mb-6 font-bold text-neutral-900">
        {mode === 'add' ? tRoot('addDepartment') : tRoot('editDepartment')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField fullWidth isInvalid={!!errors.name}>
                  <Label>{t('name')}</Label>
                  <Input
                    {...field}
                    placeholder={t('namePlaceholder')}
                  />
                  <FieldError>
                    {errors.name?.message}
                  </FieldError>
                </TextField>
              )}
            />

            <Controller
              name="supportIds"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1 w-full">
                  <SelectSupports
                    label={t('supports')}
                    placeholder={t('supportsPlaceholder')}
                    value={field.value.map(String)}
                    onChange={(val) => field.onChange(val.map(Number))}
                    fullWidth
                  />
                  {errors.supportIds && (
                    <span className="text-danger text-xs mt-1">
                      {errors.supportIds.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="border-border flex justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            onPress={() => router.push(ROUTES.departments)}
            isDisabled={isPending}
          >
            {t('cancel')}
          </Button>

          <Button type="submit" variant="primary" isPending={isPending}>
            {mode === 'add' ? t('submit') : t('save')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentManageClient;
