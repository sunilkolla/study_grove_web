import {
  addDaysIso,
  mondayOfWeekIso,
  parseIso,
  todayIso,
} from "@/lib/revisionDates";

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export type StreakDayCell = {
  label: string;
  iso: string;
  completed: boolean;
  isToday: boolean;
  isFrozen: boolean;
  isFuture: boolean;
};

export function formatWeekRangeLabel(
  weekStartIso: string,
  weekEndIso: string,
): string {
  const start = parseIso(weekStartIso);
  const end = parseIso(weekEndIso);
  const startPart = `${start.getDate()} ${MONTHS_SHORT[start.getMonth()]}`;
  const endPart = `${end.getDate()} ${MONTHS_SHORT[end.getMonth()]}`;
  return `${startPart} - ${endPart}`;
}

export function weekMondayForOffset(weekOffset: number, now = new Date()): string {
  const today = todayIso(now);
  const thisMonday = mondayOfWeekIso(today);
  return addDaysIso(thisMonday, weekOffset * 7);
}

/** Consecutive study days ending at today (if met/frozen) or yesterday. */
export function completedDatesFromStreak(
  dailyStreak: number,
  todayMet: boolean,
  frozenToday: boolean,
  now = new Date(),
): Set<string> {
  const dates = new Set<string>();
  if (dailyStreak <= 0) return dates;

  const today = todayIso(now);
  let end = today;
  if (!todayMet && !frozenToday) {
    end = addDaysIso(today, -1);
  }

  let cursor = end;
  for (let i = 0; i < dailyStreak; i++) {
    dates.add(cursor);
    cursor = addDaysIso(cursor, -1);
  }
  return dates;
}

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export function buildStreakWeekDays(
  weekOffset: number,
  opts: {
    dailyStreak: number;
    todayMet: boolean;
    frozenToday: boolean;
    now?: Date;
  },
): {
  weekStartIso: string;
  weekEndIso: string;
  rangeLabel: string;
  days: StreakDayCell[];
} {
  const now = opts.now ?? new Date();
  const today = todayIso(now);
  const weekStartIso = weekMondayForOffset(weekOffset, now);
  const weekEndIso = addDaysIso(weekStartIso, 6);
  const streakDates = completedDatesFromStreak(
    opts.dailyStreak,
    opts.todayMet,
    opts.frozenToday,
    now,
  );

  const days: StreakDayCell[] = DAY_LABELS.map((label, index) => {
    const iso = addDaysIso(weekStartIso, index);
    const isToday = iso === today;
    const isFuture = iso > today;
    const isFrozen = isToday && opts.frozenToday;
    const completed =
      !isFuture && streakDates.has(iso) && !isFrozen;
    return {
      label,
      iso,
      completed,
      isToday,
      isFrozen,
      isFuture,
    };
  });

  return {
    weekStartIso,
    weekEndIso,
    rangeLabel: formatWeekRangeLabel(weekStartIso, weekEndIso),
    days,
  };
}