import { apiRequest } from '@/lib/api-request'

export type UserInfoResponse = {
  name: string
  email: string
  avatar: string
}

export async function fetchUserInfo(): Promise<UserInfoResponse> {
  try {
    return await apiRequest<UserInfoResponse>('/api/user_info')
  } catch (error) {
    throw error
  }
}
