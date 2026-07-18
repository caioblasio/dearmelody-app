export type MoodIconKind =
  | 'serene'
  | 'melancholy'
  | 'electric'
  | 'organic'
  | 'dreamy'
  | 'cozy'
  | 'nostalgic'

const MOOD_ICONS = new Set<MoodIconKind>([
  'serene',
  'melancholy',
  'electric',
  'organic',
  'dreamy',
  'cozy',
  'nostalgic',
])

export function toMoodIcon(m: string | null | undefined): MoodIconKind {
  if (!m) return 'serene'
  return MOOD_ICONS.has(m as MoodIconKind) ? (m as MoodIconKind) : 'serene'
}

export function capitalizeMood(mood: string | null | undefined): string {
  if (!mood) return ''
  return mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase()
}
