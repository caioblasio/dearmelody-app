import { apiRequest } from '@/lib/api-request'

export type UserInfoResponse = {
  name: string
  email: string
  avatar: string
}

export async function fetchUserInfo(): Promise<UserInfoResponse> {
  return apiRequest<UserInfoResponse>('/api/user_info')
}
