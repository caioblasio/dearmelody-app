import { ApiError, apiRequest } from '@/lib/api-request'

export type LoginPayload = {
  email: string
  password: string
  remember: boolean
}

export type LoginResponse = {
  token: string
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    return await apiRequest<LoginResponse>('/api/auth', {
      method: 'POST',
      body: {
        email: payload.email,
        password: payload.password,
      },
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      throw new Error('INVALID_CREDENTIALS', { cause: error })
    }
    throw error
  }
}
