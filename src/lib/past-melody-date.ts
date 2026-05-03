import type { PastMelodyEntry } from '@/lib/past-melodies-mock'

export function parsePastMelodyEntryDate(entry: PastMelodyEntry): Date {
  const parsed = new Date(entry.dateLabel)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}
