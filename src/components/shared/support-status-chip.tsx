import { Chip } from '@heroui/react';

interface SupportStatusChipProps {
  status: 'AVAILABLE' | 'ON_LEAVE' | 'INACTIVE' | null;
  label: string;
}

interface SupportStatusStyle {
  chip: string;
  dot: string;
}

const STATUS_STYLES: Record<string, SupportStatusStyle> = {
  AVAILABLE: {
    chip: 'border-success-200 bg-success-soft text-success-soft-foreground',
    dot: 'bg-success',
  },
  ON_LEAVE: {
    chip: 'border-warning-200 bg-warning-soft text-warning-soft-foreground',
    dot: 'bg-warning',
  },
  INACTIVE: {
    chip: 'border-danger-200 bg-danger-soft text-danger-soft-foreground',
    dot: 'bg-danger',
  },
  default: {
    chip: 'border-neutral-200 bg-neutral-100 text-neutral-600',
    dot: 'bg-neutral-400',
  },
};

const SupportStatusChip = ({ status, label }: SupportStatusChipProps) => {
  const styles = status ? STATUS_STYLES[status] : STATUS_STYLES.default;

  return (
    <Chip
      size="md"
      variant="secondary"
      className={`gap-1.5 rounded-sm border px-2.5 ${styles.chip}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 shrink-0 rounded-full ${styles.dot}`}
      />
      <Chip.Label className="text-caption font-semibold">{label}</Chip.Label>
    </Chip>
  );
};

export default SupportStatusChip;
