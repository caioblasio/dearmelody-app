import type { MoodIconKind } from '@/lib/past-melody-mood'

export type ArchiveMoodTheme = {
  card: string
  date: string
  title: string
  excerpt: string
  moodPill: string
  moodDot: string
  player: string
  play: string
}

/** Mood-tinted surfaces aligned with Warm Studio palette */
export function getArchiveMoodTheme(mood: MoodIconKind): ArchiveMoodTheme {
  switch (mood) {
    case 'serene':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-[#E8F4EF] text-[#4A6B62] border-[#9BC8B8]/60',
        moodDot: 'bg-[#9BC8B8]',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-plum hover:text-plum-light',
      }
    case 'melancholy':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-plum-bg text-plum border-plum-light/40',
        moodDot: 'bg-plum-light',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-plum hover:text-plum-light',
      }
    case 'cozy':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-butter-bg text-butter-deep border-butter/60',
        moodDot: 'bg-butter',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-coral hover:text-coral-light',
      }
    case 'dreamy':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-plum-bg text-plum border-plum-light/40',
        moodDot: 'bg-plum-light',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-plum hover:text-plum-light',
      }
    case 'nostalgic':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-[#FCEAEA] text-[#8B4A4A] border-[#F2A0A0]/60',
        moodDot: 'bg-[#F2A0A0]',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-coral hover:text-coral-light',
      }
    case 'organic':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-[#E8F4EF] text-[#4A6B62] border-[#9BC8B8]/60',
        moodDot: 'bg-[#9BC8B8]',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-plum hover:text-plum-light',
      }
    case 'electric':
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-chip-bg text-coral border-peach/60',
        moodDot: 'bg-coral',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-coral hover:text-coral-light',
      }
    default:
      return {
        card: 'bg-card-bg border-warm-border hover:border-peach',
        date: 'text-sand',
        title: 'text-ink',
        excerpt: 'text-muted',
        moodPill: 'bg-chip-bg text-ink border-warm-border',
        moodDot: 'bg-peach',
        player: 'bg-card-bg/80 border-warm-border',
        play: 'text-plum hover:text-plum-light',
      }
  }
}
