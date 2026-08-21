import type {
  GetManagementOverviewResponseDto,
  GetManagementOverviewTrendResponseDto,
  ManagementOverviewCardsDto,
  OverviewTrendPointDto,
} from './_dto';
import type {
  IManagementOverviewCards,
  IOverviewTrend,
  IOverviewTrendPoint,
} from '@/models';

export const toManagementOverviewCards = (
  cards: ManagementOverviewCardsDto,
): IManagementOverviewCards => ({
  totalTickets: cards.totalTickets,
  openTickets: cards.openTickets,
  inProgressTickets: cards.inProgressTickets,
  waitingForUserTickets: cards.waitingForUserTickets,
  closedTickets: cards.closedTickets,
  unassignedTickets: cards.unassignedTickets,
  needsReplyTickets: cards.needsReplyTickets,
  overdueTickets: cards.overdueTickets,
});

const persianDigitMap: Record<string, string> = {
  '0': '۰',
  '1': '۱',
  '2': '۲',
  '3': '۳',
  '4': '۴',
  '5': '۵',
  '6': '۶',
  '7': '۷',
  '8': '۸',
  '9': '۹',
};

const fallbackLabelMap: Record<string, string> = {
  saturday: 'شنبه',
  sunday: 'یکشنبه',
  monday: 'دوشنبه',
  tuesday: 'سه‌شنبه',
  wednesday: 'چهارشنبه',
  thursday: 'پنجشنبه',
  friday: 'جمعه',
  farvardin: 'فروردین',
  ordibehesht: 'اردیبهشت',
  khordad: 'خرداد',
  tir: 'تیر',
  mordad: 'مرداد',
  shahrivar: 'شهریور',
  mehr: 'مهر',
  aban: 'آبان',
  azar: 'آذر',
  dey: 'دی',
  bahman: 'بهمن',
  esfand: 'اسفند',
};

const toPersianDigits = (value: string): string => {
  return value.replace(/[0-9]/g, (digit) => persianDigitMap[digit] ?? digit);
};

const toPersianTrendLabel = (label: string): string => {
  const fallbackLabel = fallbackLabelMap[label.toLowerCase()] ?? label;

  return toPersianDigits(fallbackLabel);
};

export const toOverviewTrendPoint = (
  point: OverviewTrendPointDto,
): IOverviewTrendPoint => ({
  label: toPersianTrendLabel(point.label),
  date: toPersianDigits(point.date),
  count: point.count,
});

export const toManagementOverview = (
  response: GetManagementOverviewResponseDto,
): IManagementOverviewCards => toManagementOverviewCards(response.cards);

export const toOverviewTrend = (
  response: GetManagementOverviewTrendResponseDto,
): IOverviewTrend => ({
  range: response.range,
  points: response.points.map(toOverviewTrendPoint),
});
