import type { MoodIconKind } from '@/lib/past-melody-mood'

/** Text colors aligned with archive mood pills (Warm Studio palette). */
export const MOOD_TEXT_COLORS: Record<MoodIconKind, string> = {
  serene: '#4A6B62',
  melancholy: '#5B3B8C',
  electric: '#FF7A59',
  organic: '#4A6B62',
  dreamy: '#5B3B8C',
  cozy: '#7A5A16',
  nostalgic: '#8B4A4A',
}

/** Static placeholder until mood-of-the-month is computed from diary data. */
export const MOOD_OF_THE_MONTH: MoodIconKind = 'cozy'

export function getMoodTextColor(mood: MoodIconKind): string {
  return MOOD_TEXT_COLORS[mood]
}
