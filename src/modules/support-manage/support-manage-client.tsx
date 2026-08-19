'use client';

import {
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  TextField,
  Label,
  FieldError,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { clientSupportServices } from '@/apis/services/supports/client';
import {
  SelectDepartments,
  SelectAvailability,
  PasswordField,
} from '@/components/shared';
import { ROUTES } from '@/constants';
import { usePostRequest } from '@/hooks';
import { supportFormSchema, type SupportFormValues } from './schema';
import type { ISupportDetails } from '@/models';

type SupportManageClientProps = {
  mode: 'add' | 'edit';
  initialData?: ISupportDetails;
};

const PERMISSIONS = [
  'VIEW_TICKET',
  'REPLY_TICKET',
  'CHANGE_TICKET_STATUS',
  'CHANGE_TICKET_DEPARTMENT',
  'CHANGE_TICKET_ASSIGNMENT',
];

const SupportManageClient = ({ mode, initialData }: SupportManageClientProps) => {
  const t = useTranslations('supports.form');
  const tPerms = useTranslations('supports.permissions');
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      username: initialData?.username || '',
      password: '',
      departmentIds: initialData?.departments.map((d) => d.id) || [],
      availabilityStatus: initialData?.availabilityStatus || 'AVAILABLE',
      permissions: initialData?.permissions || [],
    },
  });

  const { mutateAsync: createSupport, isPending: isCreating } = usePostRequest({
    requestFn: clientSupportServices.createSupport,
    getSuccessDescription: () => t('successAdd'),
  });

  const { mutateAsync: updateSupport, isPending: isUpdating } = usePostRequest({
    requestFn: (payload: SupportFormValues) =>
      clientSupportServices.updateSupport(initialData!.id, payload),
    getSuccessDescription: () => t('successEdit'),
  });

  const onSubmit = async (data: SupportFormValues) => {
    try {
      if (mode === 'add') {
        await createSupport(data as Parameters<typeof createSupport>[0]);
      } else {
        const payload = { ...data };

        if (!payload.password) {
          delete payload.password;
        }

        await updateSupport(payload);
      }

      router.push(ROUTES.supports);
      router.refresh();
    } catch {
      // Error handled by hook
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="border-border bg-surface mx-auto rounded-xl border p-6 shadow-sm">
      <h1 className="text-h3 mb-6 font-bold text-neutral-900">
        {mode === 'add' ? t('titleAdd') : t('titleEdit')}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-h5 mb-4 font-semibold text-neutral-800">
            {t('basicInfo')}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField fullWidth isInvalid={!!errors.name}>
                  <Label>{t('fields.name')}</Label>

                  <Input {...field} />

                  <FieldError>
                    {errors.name &&
                      t(errors.name.message as Parameters<typeof t>[0])}
                  </FieldError>
                </TextField>
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField fullWidth isInvalid={!!errors.username}>
                  <Label>{t('fields.username')}</Label>

                  <Input {...field} />

                  <FieldError>
                    {errors.username &&
                      t(errors.username.message as Parameters<typeof t>[0])}
                  </FieldError>
                </TextField>
              )}
            />

            <PasswordField
              label={t('fields.password')}
              placeholder={
                mode === 'edit' ? t('fields.passwordEditPlaceholder') : ''
              }
              registration={register('password')}
              error={
                errors.password &&
                t(errors.password.message as Parameters<typeof t>[0])
              }
              showPasswordLabel={t('fields.password')}
              hidePasswordLabel={t('fields.password')}
              isDisabled={isPending}
            />

            <Controller
              name="availabilityStatus"
              control={control}
              render={({ field }) => (
                <SelectAvailability
                  value={field.value}
                  onChange={field.onChange}
                  label={t('fields.availabilityStatus')}
                  fullWidth
                />
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="text-h5 mb-4 font-semibold text-neutral-800">
            {t('accessInfo')}
          </h2>

          <div className="mb-6">
            <Controller
              name="departmentIds"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-1">
                  <SelectDepartments
                    label={t('fields.departmentIds')}
                    value={field.value.map(String)}
                    onChange={(val) => field.onChange(val.map(Number))}
                    fullWidth
                  />

                  {errors.departmentIds && (
                    <span className="text-danger text-xs">
                      {t(
                        errors.departmentIds.message as Parameters<typeof t>[0],
                      )}
                    </span>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="permissions"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                isDisabled={isPending}
                isInvalid={!!errors.permissions}
              >
                <Label>{t('permissionsLabel')}</Label>

                {PERMISSIONS.map((permission) => (
                  <Checkbox key={permission} value={permission}>
                    <Checkbox.Content>
                      <Checkbox.Control>
                        <Checkbox.Indicator />
                      </Checkbox.Control>

                      {tPerms(permission as Parameters<typeof tPerms>[0])}
                    </Checkbox.Content>
                  </Checkbox>
                ))}

                {errors.permissions && (
                  <FieldError>
                    {t(errors.permissions.message as Parameters<typeof t>[0])}
                  </FieldError>
                )}
              </CheckboxGroup>
            )}
          />
        </div>

        <div className="border-border flex justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="ghost"
            onPress={() => router.push(ROUTES.supports)}
            isDisabled={isPending}
          >
            {t('cancel')}
          </Button>

          <Button type="submit" variant="primary" isPending={isPending}>
            {mode === 'add' ? t('submitAdd') : t('submitEdit')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SupportManageClient;
