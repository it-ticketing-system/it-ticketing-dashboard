import { Button, Chip } from '@heroui/react';
import { Edit3 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SupportStatusChip } from '@/components/shared';
import { ICON_SIZE_CLASS } from '@/constants';
import { formatPersianDateTime } from '@/utils';
import ProfileFact from './profile-fact';
import type { IUser } from '@/models';

interface ProfileFactsViewProps {
  user: IUser;
  onEditClick: () => void;
}

const USER_ROLE_TRANSLATION_KEYS = {
  USER: 'roles.USER',
  SUPPORT: 'roles.SUPPORT',
  ADMIN: 'roles.ADMIN',
} as const satisfies Record<IUser['role'], 'roles.USER' | 'roles.SUPPORT' | 'roles.ADMIN'>;

type PermissionTranslationKey =
  | 'permissions.VIEW_TICKET'
  | 'permissions.REPLY_TICKET'
  | 'permissions.CHANGE_TICKET_STATUS'
  | 'permissions.CHANGE_TICKET_DEPARTMENT'
  | 'permissions.CHANGE_TICKET_ASSIGNMENT'
  | 'permissions.ALL';

const PERMISSION_TRANSLATION_KEYS: Record<string, PermissionTranslationKey> = {
  VIEW_TICKET: 'permissions.VIEW_TICKET',
  REPLY_TICKET: 'permissions.REPLY_TICKET',
  CHANGE_TICKET_STATUS: 'permissions.CHANGE_TICKET_STATUS',
  CHANGE_TICKET_DEPARTMENT: 'permissions.CHANGE_TICKET_DEPARTMENT',
  CHANGE_TICKET_ASSIGNMENT: 'permissions.CHANGE_TICKET_ASSIGNMENT',
  '*': 'permissions.ALL',
  ALL: 'permissions.ALL',
};

const formatProfileDateTime = (value: string | null) => {
  if (!value) {
    return null;
  }

  return formatPersianDateTime(value);
};

const ProfileFactsView = ({ user, onEditClick }: ProfileFactsViewProps) => {
  const t = useTranslations('profile.editor');

  const createdAtLabel = formatProfileDateTime(user.createdAt);
  const lastLoginAtLabel = formatProfileDateTime(user.lastLoginAt);
  const isSupport = user.role === 'SUPPORT';

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ProfileFact label={t('fields.name.label')} value={user.name} />
        <ProfileFact label={t('fields.username.label')} value={user.username} />
        <ProfileFact
          label={t('facts.role')}
          value={t(USER_ROLE_TRANSLATION_KEYS[user.role])}
        />

        {createdAtLabel ? (
          <ProfileFact label={t('facts.createdAt')} value={createdAtLabel} />
        ) : null}

        {lastLoginAtLabel ? (
          <ProfileFact
            label={t('facts.lastLoginAt')}
            value={lastLoginAtLabel}
          />
        ) : null}

        {isSupport && user.availabilityStatus ? (
          <div className="bg-surface border-border flex min-w-0 flex-col justify-center rounded-lg border px-3 py-2">
            <p className="text-caption text-muted">
              {t('facts.availabilityStatus')}
            </p>
            <div className="mt-1">
              <SupportStatusChip
                status={user.availabilityStatus}
                label={t(`status.${user.availabilityStatus}`)}
              />
            </div>
          </div>
        ) : null}
      </div>

      {isSupport ? (
        <div className="space-y-4 pt-2">
          <div className="bg-surface border-border rounded-lg border p-4">
            <p className="text-caption text-muted mb-2 font-medium">
              {t('facts.departments')}
            </p>
            {user.departments && user.departments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.departments.map((dept) => (
                  <Chip
                    key={dept.id}
                    size="sm"
                    variant="secondary"
                    className="border-border bg-primary-50 text-foreground border font-medium"
                  >
                    {dept.name}
                  </Chip>
                ))}
              </div>
            ) : (
              <p className="text-body-sm text-muted">
                {t('facts.noDepartments')}
              </p>
            )}
          </div>

          <div className="bg-surface border-border rounded-lg border p-4">
            <p className="text-caption text-muted mb-2 font-medium">
              {t('facts.permissions')}
            </p>
            {user.permissions && user.permissions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.permissions.map((perm) => {
                  const permKey = PERMISSION_TRANSLATION_KEYS[perm];
                  const permLabel = permKey ? t(permKey) : perm;

                  return (
                    <Chip
                      key={perm}
                      size="sm"
                      variant="secondary"
                      className="border-border bg-accent-soft text-accent-soft-foreground border font-medium"
                    >
                      {permLabel}
                    </Chip>
                  );
                })}
              </div>
            ) : (
              <p className="text-body-sm text-muted">
                {t('facts.noPermissions')}
              </p>
            )}
          </div>
        </div>
      ) : null}

      <div className="border-separator flex border-t pt-4">
        <Button
          type="button"
          size="md"
          variant="outline"
          className="ms-auto"
          onPress={onEditClick}
        >
          <Edit3 aria-hidden="true" className={ICON_SIZE_CLASS.sm} />
          {t('actions.edit')}
        </Button>
      </div>
    </div>
  );
};

export default ProfileFactsView;
