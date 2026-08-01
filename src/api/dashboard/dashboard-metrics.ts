import { apiRequest } from '@/lib/api-request'

export type StreakHistoryDay = {
  date: string
  hasEntry: boolean
}

export type StreakMetrics = {
  history: StreakHistoryDay[]
  streak: number
}

export type Achievement = {
  code: string
  name: string
  description: string
  earned: boolean
  earnedAt: string | null
}

export type WeeklyMoodMetrics = {
  mood: string | null
  counts: Record<string, number>
}

export type WeeklyStyleMetrics = {
  style: string | null
  counts: Record<string, number>
}

export type DashboardMetricsResponse = {
  streak: StreakMetrics
  achievements: Achievement[]
  weeklyMood: WeeklyMoodMetrics
  weeklyStyle: WeeklyStyleMetrics
}

export async function getDashboardMetrics(): Promise<DashboardMetricsResponse> {
  return apiRequest<DashboardMetricsResponse>('/api/metrics/dashboard', { auth: true })
}
