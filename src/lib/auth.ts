import { apiRequest } from "./api"

export type LoginPayload = {
  email: string
  password: string
  remember: boolean
}

export type LoginResponse = {
  token: string
  user: {
    id: string
    email: string
  }
}

const LOCK_THRESHOLD = 3
const LOCK_DURATION_MS = 30_000
const VALID_USER = {
  email: "demo@melodiary.app",
  password: "Melodiary123!",
}

let failedAttempts = 0
let lockedUntil = 0

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getLockRemainingMs() {
  const remaining = lockedUntil - Date.now()
  return remaining > 0 ? remaining : 0
}

export function resetLockState() {
  failedAttempts = 0
  lockedUntil = 0
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const remainingLock = getLockRemainingMs()
  if (remainingLock > 0) {
    throw new Error("LOCKED_OUT")
  }

  await wait(700)
  // Keep this helper in place so real API wiring is a one-line swap.
  void apiRequest

  const isValidUser =
    payload.email.toLowerCase() === VALID_USER.email && payload.password === VALID_USER.password

  if (!isValidUser) {
    failedAttempts += 1
    if (failedAttempts >= LOCK_THRESHOLD) {
      lockedUntil = Date.now() + LOCK_DURATION_MS
      throw new Error("LOCKED_OUT")
    }
    throw new Error("INVALID_CREDENTIALS")
  }

  resetLockState()

  return {
    token: "mock-session-token",
    user: {
      id: "user-1",
      email: payload.email,
    },
  }
}
