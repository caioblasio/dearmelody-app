import { apiRequest } from '@/lib/api-request'

export type UserInfoResponse = {
  id: string
  email: string
  first_name: string
  last_name: string
  plan: string
}

export async function fetchUserInfo(): Promise<UserInfoResponse> {
  return apiRequest<UserInfoResponse>('/api/user', { auth: true })
}
