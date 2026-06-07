import { delay, http, HttpResponse } from 'msw'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import type { GenerateStatus } from '@/api/diary/generate-status'
import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { PAST_MELODIES_MOCK } from '@/mocks/past-melodies-mock'

function buildMockLyrics(entry: string): string {
  const sentences = entry.split(/(?<=[.!?])\s+/).filter(Boolean)
  const stanzas = sentences.length > 0 ? sentences : [entry]
  return stanzas.slice(0, 6).join('\n\n')
}

function diaryListItemToDetail(item: DiaryListItem): DiaryEntryDetail {
  const generateStatus = (item.music?.generateStatus ?? 'new') as GenerateStatus
  const isDone = generateStatus === 'done'

  return {
    id: item.id,
    title: item.title,
    mood: item.mood,
    entry: item.entry,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    musics: item.music
      ? [
          {
            id: 1,
            title: item.music.title,
            service: 'suno',
            imageLocation: isDone ? item.music.imageLocation : null,
            lyrics: isDone ? buildMockLyrics(item.entry) : null,
            generateStatus,
            createdAt: item.createdAt,
          },
        ]
      : null,
  }
}

const MOCK_LOGIN_USER = {
  email: 'demo@melodiary.app',
  password: 'Melodiary123!',
}

export const handlers = [
  http.post('/api/auth', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string }
    await delay(700)
    const isValid =
      body.email.toLowerCase() === MOCK_LOGIN_USER.email &&
      body.password === MOCK_LOGIN_USER.password
    if (!isValid) {
      return new HttpResponse(null, { status: 401 })
    }
    return HttpResponse.json({ token: 'mock-jwt-token' })
  }),

  http.get('/api/user', async () => {
    return HttpResponse.json({
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      email: 'john@test.com',
      first_name: 'John',
      last_name: 'Doe',
      plan: 'free',
    })
  }),
  http.post('/api/new_diary', async ({ request }) => {
    const body = (await request.json()) as { entry: string; title?: string }
    await delay(1500)
    if (!body.entry?.trim()) {
      return HttpResponse.json(
        { errors: { entry: 'This value should not be blank.' } },
        { status: 422 }
      )
    }
    return HttpResponse.json(
      { id: `22222222-2222-4222-8222-${Date.now().toString().padStart(12, '0')}` },
      { status: 201 }
    )
  }),
  http.get('/api/diary', async ({ request }) => {
    await delay(400)
    const url = new URL(request.url)
    const limit = Math.max(1, Number.parseInt(url.searchParams.get('limit') ?? '10', 10) || 10)
    const offset = Math.max(0, Number.parseInt(url.searchParams.get('offset') ?? '0', 10) || 0)
    return HttpResponse.json(PAST_MELODIES_MOCK.slice(offset, offset + limit))
  }),
  http.get('/api/diary/:id', async ({ params }) => {
    await delay(350)
    const id = String(params.id)
    const entry = PAST_MELODIES_MOCK.find((e) => e.id === id)
    if (!entry) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(diaryListItemToDetail(entry))
  }),
  http.get('/api/music/:id/stream', async () => {
    await delay(400)
    const sample = await fetch('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/tango.mp3')
    if (!sample.ok) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const buffer = await sample.arrayBuffer()
    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(buffer.byteLength),
      },
    })
  }),
]
