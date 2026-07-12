import { cn } from '@/lib/utils'

/** Shared flex, width, corner radius, and padding (no fixed aspect — use for tall content like New Entry). */
export const ARCHIVE_CARD_SHELL_GEOMETRY =
  'flex w-full flex-col rounded-[20px] p-4 lg:rounded-[24px] lg:p-8'

/** Portrait tile on small screens for grid archive cards only. */
export const ARCHIVE_CARD_SHELL_GRID_ASPECT = 'aspect-[3/4] lg:aspect-auto'

/** Full layout for Past Melodies grid cells (geometry + mobile aspect). */
export const ARCHIVE_CARD_SHELL_LAYOUT = cn(ARCHIVE_CARD_SHELL_GEOMETRY, ARCHIVE_CARD_SHELL_GRID_ASPECT)

/** Neutral border, surface, and elevation for archive-style cards without mood tint (e.g. New Entry). */
export const ARCHIVE_CARD_SHELL_NEUTRAL =
  'border border-warm-border bg-card-bg shadow-sm lg:shadow-md hover:border-peach motion-safe:transition-[box-shadow,border-color] hover:shadow-lg'

export function archiveCardShellNeutralClass(extra?: string) {
  return cn(ARCHIVE_CARD_SHELL_GEOMETRY, ARCHIVE_CARD_SHELL_NEUTRAL, extra)
}
