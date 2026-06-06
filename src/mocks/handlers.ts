import { delay, http, HttpResponse } from 'msw'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import { parsePastMelodyEntryDate } from '@/lib/past-melody-date'
import { PAST_MELODIES_MOCK, type PastMelodyEntry } from '@/lib/past-melodies-mock'

function buildMockLyrics(entry: PastMelodyEntry): string {
  const sentences = entry.excerpt.split(/(?<=[.!?])\s+/).filter(Boolean)
  const stanzas = sentences.length > 0 ? sentences : [entry.excerpt]
  return stanzas.slice(0, 6).join('\n\n')
}

function pastMelodyToDetail(entry: PastMelodyEntry): DiaryEntryDetail {
  const d = parsePastMelodyEntryDate(entry)
  const iso = d.toISOString()
  return {
    id: entry.id,
    title: entry.title,
    mood: entry.moodIcon,
    entry: entry.excerpt,
    createdAt: iso,
    updatedAt: iso,
    favorite: entry.favorite,
    musics: [
      {
        id: 1,
        title: entry.trackTitle,
        service: 'suno',
        location: null,
        imageLocation: entry.artSrc,
        lyrics: buildMockLyrics(entry),
        createdAt: iso,
      },
    ],
  }
}

// Mock login — matches POST /api/auth (see API-CONTRACT.md).
// Uncomment and add to `handlers` when working offline without the real API.
//
// const MOCK_LOGIN_USER = {
//   email: 'demo@melodiary.app',
//   password: 'Melodiary123!',
// }
//
// http.post('/api/auth', async ({ request }) => {
//   const body = (await request.json()) as { email: string; password: string }
//   await delay(700)
//   const isValid =
//     body.email.toLowerCase() === MOCK_LOGIN_USER.email &&
//     body.password === MOCK_LOGIN_USER.password
//   if (!isValid) {
//     return new HttpResponse(null, { status: 401 })
//   }
//   return HttpResponse.json({ token: 'mock-jwt-token' })
// }),

// http.get('/api/user', async () => {
//   return HttpResponse.json({
//     id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
//     email: 'john@test.com',
//     first_name: 'John',
//     last_name: 'Doe',
//     plan: 'free',
//   })
// }),

export const handlers = [
  http.post('/api/diary/new-entry', async ({ request }) => {
    const body = (await request.json()) as { reflection: string; resonance: string }
    await delay(1500)
    const resonantLabel =
      body.resonance.slice(0, 1).toUpperCase() + body.resonance.slice(1).toLowerCase()
    return HttpResponse.json({
      id: 'entry-' + Date.now(),
      title: `${resonantLabel} melody`,
      url: 'https://example.com/songs/mock-song.mp3',
      duration: 180,
      mood: body.resonance,
    })
  }),
  http.get('/api/diary', async () => {
    await delay(400)
    return HttpResponse.json({
      entries: PAST_MELODIES_MOCK,
    })
  }),
  http.get('/api/diary/:id', async ({ params }) => {
    await delay(350)
    const id = String(params.id)
    const entry = PAST_MELODIES_MOCK.find((e) => e.id === id)
    if (!entry) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(pastMelodyToDetail(entry))
  }),
]
