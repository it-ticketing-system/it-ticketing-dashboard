'use client';

import { Button, Modal } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils';
import type { FormEventHandler, ReactNode } from 'react';

type PModalIntent = 'content' | 'action';

type PModalClassNames = {
  backdrop?: string;
  container?: string;
  dialog?: string;
  header?: string;
  body?: string;
  footer?: string;
};

type PModalAction = {
  label?: string;
  icon?: ReactNode;
  isDisabled?: boolean;
  isPending?: boolean;
  onPress?: () => void | Promise<void>;
  closeOnPress?: boolean;
  type?: 'button' | 'submit';
};

type PModalFooter =
  | false
  | {
      cancel?: false | Omit<PModalAction, 'icon' | 'isPending' | 'type'>;
      submit?: PModalAction;
    };

type PModalForm = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  noValidate?: boolean;
};

type PModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description?: string;
  ariaLabel?: string;
  intent: PModalIntent;
  children: ReactNode;
  backdropVariant?: 'opaque' | 'transparent' | 'blur';
  classNames?: PModalClassNames;
  footer?: PModalFooter;
  form?: PModalForm;
  scroll?: 'inside' | 'outside';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'cover' | 'full';
};

const PModal = ({
  isOpen,
  onOpenChange,
  title,
  description,
  ariaLabel,
  intent,
  children,
  backdropVariant = 'opaque',
  classNames,
  footer,
  form,
  scroll,
  size,
}: PModalProps) => {
  const tCommon = useTranslations('common');
  const isActionModal = intent === 'action';
  const resolvedFooter =
    footer === undefined && isActionModal
      ? {
          cancel: {},
          submit: {},
        }
      : footer;

  const renderFooter = (close: () => void) => {
    if (!resolvedFooter) {
      return null;
    }

    const cancel = resolvedFooter.cancel ?? {};
    const submit = resolvedFooter.submit;

    return (
      <Modal.Footer
        className={cn(
          'border-border border-t px-6 pt-4 pb-[calc(16px+env(safe-area-inset-bottom))]',
          classNames?.footer,
        )}
      >
        <div className="flex w-full items-center justify-end gap-2">
          {cancel !== false ? (
            <Button
              type="button"
              variant="outline"
              size="md"
              isDisabled={cancel.isDisabled}
              onPress={async () => {
                await cancel.onPress?.();
                close();
              }}
              className="border-field-border h-11 rounded-md"
            >
              {cancel.label ?? tCommon('actions.cancel')}
            </Button>
          ) : null}

          {submit ? (
            <Button
              type={submit.type ?? 'button'}
              variant="primary"
              size="md"
              isDisabled={submit.isDisabled}
              isPending={submit.isPending}
              onPress={
                submit.type === 'submit'
                  ? undefined
                  : async () => {
                      await submit.onPress?.();

                      if (submit.closeOnPress !== false) {
                        close();
                      }
                    }
              }
              className="h-11 rounded-md px-5"
            >
              {submit.icon}
              {submit.label ?? tCommon('actions.apply')}
            </Button>
          ) : null}
        </div>
      </Modal.Footer>
    );
  };

  const renderContent = (close: () => void) => {
    const content = (
      <>
        <Modal.Header
          className={cn(
            'border-border flex flex-col items-start gap-1 border-b px-6 py-4',
            classNames?.header,
          )}
        >
          <Modal.Heading className="text-h3">{title}</Modal.Heading>
          {description ? (
            <p className="text-caption text-muted font-normal">{description}</p>
          ) : null}
        </Modal.Header>

        <Modal.Body
          className={cn('overflow-y-auto px-6 py-5', classNames?.body)}
        >
          {children}
        </Modal.Body>

        {renderFooter(close)}
      </>
    );

    if (form) {
      return (
        <form onSubmit={form.onSubmit} noValidate={form.noValidate}>
          {content}
        </form>
      );
    }

    return content;
  };

  return (
    <Modal>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant={backdropVariant}
        className={cn('bg-backdrop', classNames?.backdrop)}
      >
        <Modal.Container
          placement={isActionModal ? 'bottom' : undefined}
          scroll={scroll}
          size={size}
          className={cn(
            isActionModal && 'items-end p-0',
            classNames?.container,
          )}
        >
          <Modal.Dialog
            aria-label={ariaLabel ?? title}
            className={cn(
              'bg-surface shadow-xl',
              isActionModal
                ? 'max-h-[85dvh] w-full max-w-none rounded-t-xl rounded-b-none'
                : 'rounded-xl',
              classNames?.dialog,
            )}
          >
            {({ close }) => renderContent(close)}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default PModal;
