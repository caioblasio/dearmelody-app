// hooks/useMe.ts
import { useQuery } from '@tanstack/react-query'
import { fetchUserInfo } from './user-info'
import { getToken } from '@/lib/auth'

export function useUserInfo() {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUserInfo,
    enabled: !!getToken(), // only run if logged in
    retry: false,
    refetchOnWindowFocus: false,
  })
}
