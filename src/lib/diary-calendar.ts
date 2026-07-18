import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { formatLocalDateYmd } from '@/lib/diary-date-range'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'
import { capitalizeMood, toMoodIcon, type MoodIconKind } from '@/lib/past-melody-mood'

export type CalendarCell = {
  date: Date
  dayKey: string
  inCurrentMonth: boolean
  isToday: boolean
  isFuture: boolean
  hasEntry: boolean
  entryCount: number
}

export type TopMood = {
  mood: MoodIconKind
  label: string
}

/** First and last day of the month containing `monthDate`, as YYYY-MM-DD. */
export function getMonthRange(monthDate: Date): { dateStart: string; dateEnd: string } {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0)
  return {
    dateStart: formatLocalDateYmd(start),
    dateEnd: formatLocalDateYmd(end),
  }
}

export function addMonths(date: Date, delta: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth() + delta, 1)
  return next
}

/** Locale-correct short weekday labels, Monday-first. Uses Jan 1 2024 (a Monday) as reference. */
export function getWeekdayLabels(locale: string): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })
  const labels: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(2024, 0, 1 + i)
    labels.push(formatter.format(d))
  }
  return labels
}

export function groupEntriesByDayKey(entries: DiaryListItem[]): Map<string, DiaryListItem[]> {
  const map = new Map<string, DiaryListItem[]>()
  for (const entry of entries) {
    const key = formatLocalDateYmd(parseDiaryCreatedAt(entry.createdAt))
    const list = map.get(key)
    if (list) {
      list.push(entry)
    } else {
      map.set(key, [entry])
    }
  }
  for (const list of map.values()) {
    list.sort(
      (a, b) =>
        parseDiaryCreatedAt(b.createdAt).getTime() - parseDiaryCreatedAt(a.createdAt).getTime(),
    )
  }
  return map
}

/**
 * Build a Mon-start calendar grid for `monthDate`, padded to full weeks.
 * `entriesByDay` keys are YYYY-MM-DD.
 */
export function buildCalendarCells(
  monthDate: Date,
  entriesByDay: Map<string, DiaryListItem[]>,
): CalendarCell[] {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // JS getDay(): 0=Sun … 6=Sat. Convert to Mon-start offset (0=Mon … 6=Sun).
  const startOffset = (firstOfMonth.getDay() + 6) % 7

  const today = new Date()
  const todayKey = formatLocalDateYmd(today)

  const cells: CalendarCell[] = []

  const pushCell = (date: Date, inCurrentMonth: boolean) => {
    const dayKey = formatLocalDateYmd(date)
    const dayEntries = entriesByDay.get(dayKey)
    const entryCount = dayEntries?.length ?? 0
    cells.push({
      date,
      dayKey,
      inCurrentMonth,
      isToday: dayKey === todayKey,
      isFuture: dayKey > todayKey,
      hasEntry: entryCount > 0,
      entryCount,
    })
  }

  // Leading days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    pushCell(new Date(year, month, -i), false)
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    pushCell(new Date(year, month, day), true)
  }

  // Trailing days to complete the last week
  const trailing = (7 - (cells.length % 7)) % 7
  for (let i = 1; i <= trailing; i++) {
    pushCell(new Date(year, month + 1, i), false)
  }

  return cells
}

/** Most frequent mood among entries. Returns null when there are no entries with a mood. */
export function getTopMood(entries: DiaryListItem[]): TopMood | null {
  if (entries.length === 0) return null

  const counters = entries.reduce<Record<string, number>>((acc, entry) => {
    if (!entry.mood) return acc
    const key = entry.mood.toLowerCase()
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

  const top = Object.entries(counters).sort((a, b) => b[1] - a[1])[0]
  if (!top) return null

  const raw = top[0]
  return {
    mood: toMoodIcon(raw),
    label: capitalizeMood(raw),
  }
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
}
