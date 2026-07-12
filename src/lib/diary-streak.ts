import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { formatLocalDateYmd } from '@/lib/diary-date-range'
import { parseDiaryCreatedAt } from '@/lib/past-melody-date'

function getEntryDayKeys(entries: DiaryListItem[]): Set<string> {
  const days = new Set<string>()
  for (const entry of entries) {
    days.add(formatLocalDateYmd(parseDiaryCreatedAt(entry.createdAt)))
  }
  return days
}

export function computeCurrentStreak(entries: DiaryListItem[]): number {
  if (entries.length === 0) return 0

  const entryDays = getEntryDayKeys(entries)
  const cursor = new Date()
  const todayKey = formatLocalDateYmd(cursor)

  if (!entryDays.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1)
    if (!entryDays.has(formatLocalDateYmd(cursor))) {
      return 0
    }
  }

  let streak = 0
  while (entryDays.has(formatLocalDateYmd(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }

  return streak
}

export type StreakTier = 'cold' | 'warm' | 'hot'

export function getStreakTier(days: number): StreakTier {
  if (days >= 7) return 'hot'
  if (days >= 2) return 'warm'
  return 'cold'
}

export function getWeekStartMonday(date: Date): Date {
  const start = new Date(date)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day
  start.setDate(start.getDate() + diff)
  start.setHours(0, 0, 0, 0)
  return start
}

export type WeekDayState = 'completed' | 'today' | 'pending'

export type WeekDayStatus = {
  label: string
  state: WeekDayState
  mark: '✓' | '♪' | '·'
}

const WEEK_DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const

export function computeWeekRow(entries: DiaryListItem[], now = new Date()): WeekDayStatus[] {
  const entryDays = getEntryDayKeys(entries)
  const todayKey = formatLocalDateYmd(now)
  const weekStart = getWeekStartMonday(now)

  return WEEK_DAY_LABELS.map((label, index) => {
    const day = new Date(weekStart)
    day.setDate(weekStart.getDate() + index)
    const dayKey = formatLocalDateYmd(day)

    if (entryDays.has(dayKey)) {
      return { label, state: 'completed' as const, mark: '✓' as const }
    }

    if (dayKey === todayKey) {
      return { label, state: 'today' as const, mark: '♪' as const }
    }

    return { label, state: 'pending' as const, mark: '·' as const }
  })
}

export type MeloStreakCopy = {
  level: number
  titleKey: 'dashboard.progress.meloLevel0' | 'dashboard.progress.meloLevel1' | 'dashboard.progress.meloLevel2' | 'dashboard.progress.meloLevel3'
  nextKey: 'dashboard.progress.meloNext0' | 'dashboard.progress.meloNext1' | 'dashboard.progress.meloNext2' | 'dashboard.progress.meloNext3'
}

export function getMeloStreakCopy(streakDays: number): MeloStreakCopy {
  if (streakDays >= 30) {
    return {
      level: 4,
      titleKey: 'dashboard.progress.meloLevel3',
      nextKey: 'dashboard.progress.meloNext3',
    }
  }

  if (streakDays >= 14) {
    return {
      level: 3,
      titleKey: 'dashboard.progress.meloLevel2',
      nextKey: 'dashboard.progress.meloNext2',
    }
  }

  if (streakDays >= 7) {
    return {
      level: 2,
      titleKey: 'dashboard.progress.meloLevel1',
      nextKey: 'dashboard.progress.meloNext1',
    }
  }

  return {
    level: 1,
    titleKey: 'dashboard.progress.meloLevel0',
    nextKey: 'dashboard.progress.meloNext0',
  }
}
