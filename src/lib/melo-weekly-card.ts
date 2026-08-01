import type { MeloGenreKey, MeloMoodKey } from '@/components/melo/MeloMoodGenrePoses'

export type MeloResolvedCard =
  | { kind: 'mood'; key: MeloMoodKey }
  | { kind: 'genre'; key: MeloGenreKey }
  | { kind: 'official' }

const MELO_MOOD_KEYS = new Set<string>([
  'happy',
  'reflexive',
  'sad',
  'nostalgic',
  'dreamy',
  'cozy',
  'productive',
  'outgoing',
  'introspective',
  'relaxed',
  'inspiring',
])

const MELO_GENRE_KEYS = new Set<string>([
  'pop',
  'rock',
  'metal',
  'hip-hop',
  'r&b',
  'folk',
  'electronic',
  'latin',
  'asian',
  'classic',
  'jazz',
])

function normalizeKey(value: string | null | undefined): string | null {
  if (value == null) return null
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 ? normalized : null
}

export function matchMeloMood(mood: string | null | undefined): MeloMoodKey | null {
  const key = normalizeKey(mood)
  if (!key || !MELO_MOOD_KEYS.has(key)) return null
  return key as MeloMoodKey
}

export function matchMeloGenre(style: string | null | undefined): MeloGenreKey | null {
  const key = normalizeKey(style)
  if (!key || !MELO_GENRE_KEYS.has(key)) return null
  return key as MeloGenreKey
}

/** Resolve which Melo card candidates match weekly mood/style (exact, case-insensitive). */
export function resolveMeloCardCandidates(
  mood: string | null | undefined,
  style: string | null | undefined
): { mood: MeloMoodKey | null; genre: MeloGenreKey | null } {
  return {
    mood: matchMeloMood(mood),
    genre: matchMeloGenre(style),
  }
}

/**
 * Pick a single card from match candidates.
 * - both → caller should randomize between them
 * - one → that one
 * - none → official
 */
export function pickMeloCard(
  moodKey: MeloMoodKey | null,
  genreKey: MeloGenreKey | null,
  prefer: 'mood' | 'genre' | null = null
): MeloResolvedCard {
  if (moodKey && genreKey) {
    if (prefer === 'genre') return { kind: 'genre', key: genreKey }
    if (prefer === 'mood') return { kind: 'mood', key: moodKey }
    return Math.random() < 0.5
      ? { kind: 'mood', key: moodKey }
      : { kind: 'genre', key: genreKey }
  }
  if (moodKey) return { kind: 'mood', key: moodKey }
  if (genreKey) return { kind: 'genre', key: genreKey }
  return { kind: 'official' }
}
