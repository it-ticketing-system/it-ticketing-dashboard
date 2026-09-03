import { Card } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks';
import MessageComposer from './message-composer';
import TicketMessage from './ticket-message';
import type { TicketMessage as TicketMessageData } from '../types';
import type { TicketStatus } from '@/models';

interface TicketConversationProps {
  ticketId: string;
  messages: TicketMessageData[];
  status: TicketStatus;
  canReply?: boolean;
}

const TicketConversation = ({
  ticketId,
  messages,
  status,
  canReply,
}: TicketConversationProps) => {
  const t = useTranslations('ticketDetails.conversation');
  const { hasPermission, user } = useAuth();

  const hasReplyPermission = hasPermission('REPLY_TICKET');
  const isOnLeave = user?.availabilityStatus === 'ON_LEAVE';
  const isDisabled =
    status === 'closed' ||
    !hasReplyPermission ||
    isOnLeave ||
    canReply === false;
  const disabledReason =
    status === 'closed'
      ? 'closed'
      : !hasReplyPermission
        ? 'noPermission'
        : isOnLeave
          ? 'onLeave'
          : 'notAssigned';

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="mb-4 flex shrink-0 items-center gap-3 lg:hidden">
        <div className="bg-separator h-px flex-1" />

        <h2 className="text-title text-foreground shrink-0">{t('title')}</h2>

        <div className="bg-separator h-px flex-1" />
      </div>

      <Card
        variant="transparent"
        className="lg:border-border lg:bg-surface flex min-h-0 flex-1 flex-col overflow-hidden border-0 bg-transparent px-0 shadow-none lg:rounded-xl lg:border lg:shadow-sm"
      >
        <Card.Content className="min-h-0 flex-1 space-y-3 overflow-y-auto p-0 pb-4 lg:p-6">
          {messages.length ? (
            messages.map((message) => (
              <TicketMessage
                key={message.id}
                message={message}
                isOwnMessage={
                  message.senderId === String(user?.id) &&
                  message.senderRole === user?.role
                }
              />
            ))
          ) : (
            <div className="flex min-h-40 items-center justify-center text-center">
              <p className="text-body-sm text-muted">{t('empty')}</p>
            </div>
          )}
        </Card.Content>

        <Card.Footer className="border-separator bg-surface block shrink-0 border-t p-0 lg:p-4">
          <MessageComposer
            ticketId={ticketId}
            isDisabled={isDisabled}
            disabledReason={disabledReason}
          />
        </Card.Footer>
      </Card>
    </section>
  );
};

export default TicketConversation;
