import { ApiError, apiRequest } from '@/lib/api-request'

export type RegisterPayload = {
  email: string
  password: string
  first_name: string
  last_name: string
  invite_code: string
}

export type RegisterResponse = {
  id: string
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  try {
    return await apiRequest<RegisterResponse>('/api/register', {
      method: 'POST',
      body: {
        email: payload.email,
        password: payload.password,
        first_name: payload.first_name,
        last_name: payload.last_name,
        invite_code: payload.invite_code,
      },
    })
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 409) {
        throw new Error('REGISTER_CONFLICT', { cause: error })
      }
      if (error.status === 429) {
        throw new Error('REGISTER_RATE_LIMITED', { cause: error })
      }
      if (error.status === 422) {
        throw new Error('REGISTER_VALIDATION', { cause: error })
      }
    }
    throw error
  }
}
