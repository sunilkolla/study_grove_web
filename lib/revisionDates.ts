/** Local-calendar helpers for revision tasks (browser + server-safe ISO strings). */

export function todayIso(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return todayIso(dt);
}

export function parseIso(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function mondayOfWeekIso(iso: string): string {
  const dt = parseIso(iso);
  const day = dt.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  dt.setDate(dt.getDate() + diff);
  return todayIso(dt);
}

export function formatDueDateLabel(dueDate: string, now = new Date()): string {
  const today = todayIso(now);
  const tomorrow = addDaysIso(today, 1);
  if (dueDate === today) return "by Today";
  if (dueDate === tomorrow) return "by Tomorrow";
  const dt = parseIso(dueDate);
  const months = [
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
  return `by ${dt.getDate()} ${months[dt.getMonth()]}`;
}

export function parseLegacyDueLabel(label: string, now = new Date()): string {
  const lower = label.toLowerCase();
  const today = todayIso(now);
  if (lower.includes("today")) return today;
  if (lower.includes("tomorrow")) return addDaysIso(today, 1);
  const match = label.match(/(\d{1,2})\s+([A-Za-z]{3})/);
  if (match) {
    const day = Number(match[1]);
    const mon = match[2].toLowerCase();
    const monthMap: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const mi = monthMap[mon];
    if (mi !== undefined) {
      const y = now.getFullYear();
      return todayIso(new Date(y, mi, day));
    }
  }
  return addDaysIso(today, 3);
}

export function isUpcomingWithinDays(
  dueDate: string,
  days: number,
  now = new Date(),
): boolean {
  const today = todayIso(now);
  if (dueDate <= today) return false;
  const limit = addDaysIso(today, days);
  return dueDate <= limit;
}