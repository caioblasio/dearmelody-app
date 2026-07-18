import { delay, http, HttpResponse } from 'msw'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import type { GenerateStatus } from '@/api/diary/generate-status'
import type { DiaryListItem } from '@/api/diary/diary-list-item'
import { formatLocalDateYmd } from '@/lib/diary-date-range'
import { PAST_MELODIES_MOCK } from '@/mocks/past-melodies-mock'

const MOCK_SAMPLE_AUDIO_URL =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/tango.mp3'

function toLocalDateYmd(iso: string): string {
  const parsed = new Date(iso)
  return Number.isNaN(parsed.getTime()) ? '' : formatLocalDateYmd(parsed)
}

function buildRecentDiaryFixtures(): DiaryListItem[] {
  const now = new Date()
  const daysAgo = (n: number) => {
    const d = new Date(now)
    d.setDate(d.getDate() - n)
    d.setHours(12, 0, 0, 0)
    return d.toISOString()
  }

  return [
    {
      id: '22222222-2222-4222-8222-222222222201',
      title: 'Canal walk after the rain',
      mood: 'cozy',
      entry:
        'We walked along the canal after the rain stopped. Everything smelled green and the city felt quiet.',
      createdAt: daysAgo(0),
      updatedAt: daysAgo(0),
      music: {
        title: 'Green Light',
        imageLocation:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuC35UzBQIhWusSQVfgBVzObl4Jo3W1gpuJdjAHcBTJJPC9FvP1mtkj6bRLAWfZBkzn8x4Mx4G7twDGCjXtYQ2KxIZ8FWQE5-5b4bXZ9kBiIsKB3qZQiHVOfGxBDwfqI2O3NHJPVbw5XxspjNrsb7XG-Dr8CycyfpYf3PDm7HYXjtZDXZgaDakATkePEDyut0yaxlLjlcWOwlw9Vp390Aa2kQ0CiKtrHjj48OpEnpJdsk7x648TTTDSJ0Gt3IxuNscsS62COTRscIYY',
        generateStatus: 'done',
      },
    },
    {
      id: '22222222-2222-4222-8222-222222222202',
      title: 'Late-night thoughts',
      mood: 'melancholy',
      entry: 'Could not sleep. The city hummed outside and I wrote until the page felt lighter.',
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
      music: null,
    },
    {
      id: '22222222-2222-4222-8222-222222222203',
      title: 'Studio morning',
      mood: 'dreamy',
      entry: 'First light through the window and a melody forming in my head before coffee.',
      createdAt: daysAgo(5),
      updatedAt: daysAgo(5),
      music: {
        title: 'Beginnings',
        imageLocation:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAxmNaO3NI7mH3sR8pJIMTllKgVCz_gb8cQaUpJEIjYUvN0z4pMeDhFchy22TNj_SEJ6_edwe4z64BV0VfjzXIaiEqkQKWzmz1SZX9dq36U_8gBQYHDyUl5ZoZQkI5i2pbcmIwaqYxdUFT2fHK5lAl_Vr6fnNH-DhnMNCVzKbZQcpw-ftUc61fMPjGV0IIuqez1bE3YpyKidIKCRD7nIZ9k-4-VNZWKvySZXOm7DYjTpKRtphdIbeTCq2dR2jYblc2waLmv7KxGhDQ',
        generateStatus: 'generating',
      },
    },
  ]
}

const ALL_DIARY_MOCK = [...buildRecentDiaryFixtures(), ...PAST_MELODIES_MOCK]

function filterDiaryEntries(entries: DiaryListItem[], params: URLSearchParams): DiaryListItem[] {
  const mood = params.get('mood')?.trim().toLowerCase()
  const dateStart = params.get('dateStart')
  const dateEnd = params.get('dateEnd')

  return entries.filter((entry) => {
    if (mood && entry.mood?.toLowerCase() !== mood) return false

    const entryDate = toLocalDateYmd(entry.createdAt)
    if (!entryDate) return false
    if (dateStart && entryDate < dateStart) return false
    if (dateEnd && entryDate > dateEnd) return false

    return true
  })
}

async function fetchMockSampleAudio(): Promise<ArrayBuffer | null> {
  const sample = await fetch(MOCK_SAMPLE_AUDIO_URL)
  if (!sample.ok) return null
  return sample.arrayBuffer()
}

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
  email: 'demo@dearmelody.app',
  password: 'dearmelody123456',
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

  http.post('/api/token/refresh', async () => {
    await delay(200)
    return HttpResponse.json({ token: 'mock-jwt-token-refreshed' })
  }),

  http.post('/api/logout', async () => {
    return HttpResponse.json({
      code: 200,
      message: 'The supplied refresh_token has been invalidated.',
    })
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
    const body = (await request.json()) as { entry: string; music_style?: string }
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
    const filtered = filterDiaryEntries(ALL_DIARY_MOCK, url.searchParams)
    return HttpResponse.json(filtered.slice(offset, offset + limit))
  }),
  http.get('/api/diary/:id', async ({ params }) => {
    await delay(350)
    const id = String(params.id)
    const entry = ALL_DIARY_MOCK.find((e) => e.id === id)
    if (!entry) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.json(diaryListItemToDetail(entry))
  }),
  http.get('/api/music/:id/stream', async () => {
    await delay(400)
    const buffer = await fetchMockSampleAudio()
    if (!buffer) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(buffer.byteLength),
      },
    })
  }),
  http.get('/api/music/:id', async () => {
    await delay(400)
    const buffer = await fetchMockSampleAudio()
    if (!buffer) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return HttpResponse.arrayBuffer(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': String(buffer.byteLength),
        'Content-Disposition': 'inline',
      },
    })
  }),
]
