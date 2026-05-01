import type { MoodIconKind } from '@/lib/past-melodies-mock'
import { CloudSnow, Leaf, type LucideIcon, type LucideProps, Smile, Sparkles, Zap } from 'lucide-react'

const MOOD_ICONS: Record<MoodIconKind, LucideIcon> = {
  serene: Smile,
  melancholy: CloudSnow,
  electric: Zap,
  organic: Leaf,
  dreamy: Sparkles,
  cozy: Smile,
  nostalgic: Sparkles,
}

type PastMelodyMoodIconProps = LucideProps & {
  mood: MoodIconKind
}

export function PastMelodyMoodIcon({ mood, className, ...props }: PastMelodyMoodIconProps) {
  const Icon = MOOD_ICONS[mood]
  return <Icon className={className} aria-hidden {...props} />
}
