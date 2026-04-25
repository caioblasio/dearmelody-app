import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getLockRemainingMs, login, type LoginPayload, type LoginResponse } from './login'
import { fetchUserInfo } from '@/api/user/user-info'
import { setToken } from '@/lib/auth'

type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void | Promise<void>
  onLockedOut?: (remainingMs: number) => void
  onInvalidCredentials?: () => void
  onError?: (error: Error) => void
}

export function useLogin(options?: UseLoginOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),

    onSuccess: async (data) => {
      setToken(data.token)

      const user = await fetchUserInfo()

      queryClient.setQueryData(['user'], user)

      await options?.onSuccess?.(data)
    },

    onError: (error) => {
      if (error.message === 'LOCKED_OUT') {
        options?.onLockedOut?.(getLockRemainingMs())
        return
      }
      if (error.message === 'INVALID_CREDENTIALS') {
        options?.onInvalidCredentials?.()
        return
      }
      options?.onError?.(error)
    },
  })
}
