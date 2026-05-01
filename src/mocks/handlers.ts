import { delay, http, HttpResponse } from 'msw'

import { PAST_MELODIES_MOCK } from '@/lib/past-melodies-mock'

type LoginRequestBody = {
  email: string
  password: string
  remember: boolean
}

const LOCK_THRESHOLD = 3
const LOCK_DURATION_MS = 30_000
const VALID_USER = {
  email: 'demo@melodiary.app',
  password: 'Melodiary123!',
}

let failedAttempts = 0
let lockedUntil = 0

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const now = Date.now()
    const remainingMs = lockedUntil - now

    if (remainingMs > 0) {
      await delay(300)
      return HttpResponse.json({ code: 'LOCKED_OUT', remainingMs }, { status: 423 })
    }

    const body = (await request.json()) as LoginRequestBody
    const isValidUser =
      body.email.toLowerCase() === VALID_USER.email && body.password === VALID_USER.password

    await delay(700)

    if (!isValidUser) {
      failedAttempts += 1
      if (failedAttempts >= LOCK_THRESHOLD) {
        lockedUntil = Date.now() + LOCK_DURATION_MS
        return HttpResponse.json(
          { code: 'LOCKED_OUT', remainingMs: LOCK_DURATION_MS },
          { status: 423 }
        )
      }

      return HttpResponse.json({ code: 'INVALID_CREDENTIALS' }, { status: 401 })
    }

    failedAttempts = 0
    lockedUntil = 0

    return HttpResponse.json({
      token: 'mock-session-token',
      user: {
        id: 'user-1',
        email: body.email,
      },
    })
  }),
  http.get('/api/user_info', async () => {
    return HttpResponse.json({
      name: 'John',
      email: 'john@test.com',
      avatar: '/avatar.png',
    })
  }),
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
]
