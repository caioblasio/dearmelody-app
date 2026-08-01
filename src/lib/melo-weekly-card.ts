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

/** Prefer longer keys first so e.g. hip-hop wins over a hypothetical hop. */
const MELO_GENRE_KEYS: MeloGenreKey[] = [
  'hip-hop',
  'electronic',
  'classic',
  'r&b',
  'metal',
  'latin',
  'asian',
  'folk',
  'jazz',
  'rock',
  'pop',
]

function normalizeKey(value: string | null | undefined): string | null {
  if (value == null) return null
  const normalized = value.trim().toLowerCase()
  return normalized.length > 0 ? normalized : null
}

/** Split family labels like "Folk/Country" or "R&B/Soul" into comparable tokens. */
function styleTokens(value: string): Set<string> {
  const tokens = new Set<string>()
  for (const part of value.toLowerCase().split(/[/,\s]+/)) {
    const token = part.trim()
    if (!token) continue
    tokens.add(token)
    // Also index hyphen parts so "hip hop" can meet "hip-hop"
    if (token.includes('-')) {
      for (const sub of token.split('-')) {
        if (sub) tokens.add(sub)
      }
    }
  }
  return tokens
}

function genreTokens(key: MeloGenreKey): Set<string> {
  const tokens = new Set<string>([key])
  if (key.includes('-')) {
    for (const sub of key.split('-')) {
      if (sub) tokens.add(sub)
    }
  }
  return tokens
}

function tokensOverlap(a: Set<string>, b: Set<string>): boolean {
  for (const token of a) {
    if (b.has(token)) return true
  }
  return false
}

export function matchMeloMood(mood: string | null | undefined): MeloMoodKey | null {
  const key = normalizeKey(mood)
  if (!key || !MELO_MOOD_KEYS.has(key)) return null
  return key as MeloMoodKey
}

/**
 * Match curated style families to Melo genre poses by shared word
 * (case-insensitive). e.g. "Folk/Country" → folk, "R&B/Soul" → r&b.
 */
export function matchMeloGenre(style: string | null | undefined): MeloGenreKey | null {
  const normalized = normalizeKey(style)
  if (!normalized) return null

  if ((MELO_GENRE_KEYS as string[]).includes(normalized)) {
    return normalized as MeloGenreKey
  }

  const incoming = styleTokens(normalized)
  for (const key of MELO_GENRE_KEYS) {
    if (tokensOverlap(incoming, genreTokens(key))) {
      return key
    }
  }

  return null
}

/** Resolve which Melo card candidates match weekly mood/style. */
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
