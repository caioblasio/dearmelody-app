import { ApiError, apiRequest } from "@/lib/api-request"

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

let lockedUntil = 0

export function getLockRemainingMs() {
  const remaining = lockedUntil - Date.now()
  return remaining > 0 ? remaining : 0
}

export function resetLockState() {
  lockedUntil = 0
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const remainingLock = getLockRemainingMs()
  if (remainingLock > 0) {
    throw new Error("LOCKED_OUT")
  }

  try {
    const response = await apiRequest<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: payload,
    })
    resetLockState()
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 423) {
        const payloadWithRemaining =
          typeof error.data === "object" && error.data !== null
            ? (error.data as { remainingMs?: number })
            : {}
        const remainingMs =
          typeof payloadWithRemaining.remainingMs === "number"
            ? payloadWithRemaining.remainingMs
            : 30_000
        lockedUntil = Date.now() + remainingMs
        throw new Error("LOCKED_OUT", { cause: error })
      }
      if (error.status === 401) {
        throw new Error("INVALID_CREDENTIALS", { cause: error })
      }
    }
    throw error
  }
}
