import type { MoodIconKind } from '@/lib/past-melodies-mock'
import { CloudSnow, Leaf, type LucideProps, Smile, Sparkles, Zap } from 'lucide-react'

function iconFor(kind: MoodIconKind) {
  switch (kind) {
    case 'melancholy':
      return CloudSnow
    case 'electric':
      return Zap
    case 'organic':
      return Leaf
    case 'dreamy':
    case 'nostalgic':
      return Sparkles
    case 'cozy':
    case 'serene':
    default:
      return Smile
  }
}

type PastMelodyMoodIconProps = LucideProps & {
  mood: MoodIconKind
}

export function PastMelodyMoodIcon({ mood, className, ...props }: PastMelodyMoodIconProps) {
  const Icon = iconFor(mood)
  return <Icon className={className} aria-hidden {...props} />
}
