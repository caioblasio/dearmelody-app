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
