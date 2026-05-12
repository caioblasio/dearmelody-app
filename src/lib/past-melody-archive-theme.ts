import type { MoodIconKind } from '@/lib/past-melodies-mock'

export type ArchiveMoodTheme = {
  card: string
  date: string
  title: string
  excerpt: string
  moodPill: string
  player: string
  play: string
}

/** Mood-tinted surfaces aligned with Stitch “Archive Gallery” screens */
export function getArchiveMoodTheme(mood: MoodIconKind): ArchiveMoodTheme {
  switch (mood) {
    case 'serene':
      return {
        card: 'bg-blue-50/60 border-blue-100/70 shadow-blue-900/5 hover:shadow-blue-900/10',
        date: 'text-blue-800/70',
        title: 'text-blue-950',
        excerpt: 'text-blue-900/75',
        moodPill: 'bg-blue-100/90 text-blue-900 border-blue-200/60',
        player: 'bg-white/65 border-blue-100/50',
        play: 'text-blue-700 hover:text-blue-900',
      }
    case 'melancholy':
      return {
        card: 'bg-indigo-50/60 border-indigo-100/70 shadow-indigo-900/5 hover:shadow-indigo-900/10',
        date: 'text-indigo-800/70',
        title: 'text-indigo-950',
        excerpt: 'text-indigo-900/75',
        moodPill: 'bg-indigo-100/90 text-indigo-900 border-indigo-200/60',
        player: 'bg-white/65 border-indigo-100/50',
        play: 'text-indigo-700 hover:text-indigo-900',
      }
    case 'cozy':
      return {
        card: 'bg-amber-50/70 border-amber-100/70 shadow-amber-900/5 hover:shadow-amber-900/10',
        date: 'text-amber-900/65',
        title: 'text-amber-950',
        excerpt: 'text-amber-900/75',
        moodPill: 'bg-amber-100/90 text-amber-950 border-amber-200/60',
        player: 'bg-white/65 border-amber-100/50',
        play: 'text-amber-800 hover:text-amber-950',
      }
    case 'dreamy':
      return {
        card: 'bg-violet-50/60 border-violet-100/70 shadow-violet-900/5 hover:shadow-violet-900/10',
        date: 'text-violet-800/70',
        title: 'text-violet-950',
        excerpt: 'text-violet-900/75',
        moodPill: 'bg-violet-100/90 text-violet-900 border-violet-200/60',
        player: 'bg-white/65 border-violet-100/50',
        play: 'text-violet-700 hover:text-violet-900',
      }
    case 'nostalgic':
      return {
        card: 'bg-rose-50/55 border-rose-100/70 shadow-rose-900/5 hover:shadow-rose-900/10',
        date: 'text-rose-900/65',
        title: 'text-rose-950',
        excerpt: 'text-rose-900/75',
        moodPill: 'bg-rose-100/90 text-rose-900 border-rose-200/60',
        player: 'bg-white/65 border-rose-100/50',
        play: 'text-rose-700 hover:text-rose-900',
      }
    case 'organic':
      return {
        card: 'bg-emerald-50/55 border-emerald-100/70 shadow-emerald-900/5 hover:shadow-emerald-900/10',
        date: 'text-emerald-900/65',
        title: 'text-emerald-950',
        excerpt: 'text-emerald-900/75',
        moodPill: 'bg-emerald-100/90 text-emerald-900 border-emerald-200/60',
        player: 'bg-white/65 border-emerald-100/50',
        play: 'text-emerald-700 hover:text-emerald-900',
      }
    case 'electric':
      return {
        card: 'bg-fuchsia-50/50 border-fuchsia-100/70 shadow-fuchsia-900/5 hover:shadow-fuchsia-900/10',
        date: 'text-fuchsia-900/65',
        title: 'text-fuchsia-950',
        excerpt: 'text-fuchsia-900/75',
        moodPill: 'bg-fuchsia-100/90 text-fuchsia-900 border-fuchsia-200/60',
        player: 'bg-white/65 border-fuchsia-100/50',
        play: 'text-fuchsia-700 hover:text-fuchsia-900',
      }
    default:
      return {
        card: 'bg-surface-container-low/90 border-outline-variant/60 shadow-primary/5 hover:shadow-primary/10',
        date: 'text-on-surface-variant',
        title: 'text-primary',
        excerpt: 'text-on-surface-variant',
        moodPill: 'bg-primary-container/80 text-on-primary-container border-primary/20',
        player: 'bg-white/70 border-outline-variant/40',
        play: 'text-primary hover:text-primary/90',
      }
  }
}
