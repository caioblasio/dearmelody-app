import type { PlayerTrack } from '@/lib/player/player-context'

export function playerTrackHref(track: PlayerTrack): string {
  if (track.shareToken) return `/melodies/share/${track.shareToken}`
  return `/melodies/${track.entryId}`
}

export function isViewingPlayerTrack(
  track: PlayerTrack | null,
  entryId: string | undefined,
  shareToken: string | undefined,
): boolean {
  if (!track) return false
  if (track.shareToken) return shareToken === track.shareToken
  return Boolean(entryId) && entryId === track.entryId
}
