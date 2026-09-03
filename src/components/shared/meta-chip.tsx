import { Chip } from '@heroui/react';
import { cn } from '@/utils';

type MetaChipTone = 'primary' | 'accent' | 'neutral';

interface MetaChipProps {
  children: React.ReactNode;
  tone?: MetaChipTone;
  className?: string;
}

const TONE_STYLES: Record<MetaChipTone, string> = {
  primary: 'bg-primary-50 text-primary',
  accent: 'bg-accent-soft text-accent',
  neutral: 'bg-neutral-100 text-muted',
};

const MetaChip = ({ children, tone = 'primary', className }: MetaChipProps) => {
  return (
    <Chip
      size="sm"
      variant="secondary"
      className={cn(
        'rounded-full border-0 px-2 py-0.5 shadow-none',
        TONE_STYLES[tone],
        className,
      )}
    >
      <Chip.Label className="text-caption font-medium">{children}</Chip.Label>
    </Chip>
  );
};

export default MetaChip;
