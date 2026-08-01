import type { DashboardMetricsResponse, StreakHistoryDay } from '@/api/dashboard/dashboard-metrics'
import { formatLocalDateYmd } from '@/lib/diary-date-range'

/** Days with diary activity within the rolling 30-day window (0 = today). */
const ENTRY_DAYS_AGO = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 18, 22, 25, 28])

function buildStreakHistory(now = new Date()): StreakHistoryDay[] {
  const history: StreakHistoryDay[] = []

  for (let daysAgo = 29; daysAgo >= 0; daysAgo--) {
    const day = new Date(now)
    day.setHours(12, 0, 0, 0)
    day.setDate(day.getDate() - daysAgo)
    history.push({
      date: formatLocalDateYmd(day),
      hasEntry: ENTRY_DAYS_AGO.has(daysAgo),
    })
  }

  return history
}

/** Fixture data for GET /api/metrics/dashboard (see API-CONTRACT.md). */
export function buildDashboardMetricsMock(now = new Date()): DashboardMetricsResponse {
  return {
    streak: {
      history: buildStreakHistory(now),
      streak: 12,
    },
    achievements: [
      {
        code: 'first_song',
        name: 'First Song',
        description: 'Create your first diary entry.',
        earned: true,
        earnedAt: '2026-06-12T08:03:00+00:00',
      },
      {
        code: 'one_week',
        name: 'One Week',
        description: 'Keep a 7-day diary streak.',
        earned: true,
        earnedAt: '2026-07-20T09:15:00+00:00',
      },
      {
        code: 'night_owl',
        name: 'Night Owl',
        description: 'Write 5 diary entries between 10pm and 5am.',
        earned: true,
        earnedAt: '2026-07-25T23:40:00+00:00',
      },
      {
        code: 'one_month',
        name: 'One Month',
        description: 'Keep a 30-day diary streak.',
        earned: false,
        earnedAt: null,
      },
      {
        code: 'full_spectrum',
        name: 'Full Spectrum',
        description: 'Generate a song in every curated style family.',
        earned: false,
        earnedAt: null,
      },
      {
        code: 'renaissance_composer',
        name: 'Renaissance Composer',
        description: 'Generate a song in every curated sub-style variant.',
        earned: false,
        earnedAt: null,
      },
    ],
    weeklyMood: {
      mood: 'cozy',
      counts: { cozy: 3, melancholy: 2, dreamy: 1, serene: 1 },
    },
    weeklyStyle: {
      style: 'Pop',
      counts: { Pop: 3, Indie: 2, Ambient: 1 },
    },
  }
}
