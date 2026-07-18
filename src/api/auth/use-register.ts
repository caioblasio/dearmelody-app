import { useMutation } from '@tanstack/react-query'
import { register, type RegisterPayload, type RegisterResponse } from './register'

type UseRegisterOptions = {
  onSuccess?: (data: RegisterResponse) => void | Promise<void>
  onConflict?: () => void
  onRateLimited?: () => void
  onValidationError?: () => void
  onError?: (error: Error) => void
}

export function useRegister(options?: UseRegisterOptions) {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),

    onSuccess: async (data) => {
      await options?.onSuccess?.(data)
    },

    onError: (error) => {
      if (error.message === 'REGISTER_CONFLICT') {
        options?.onConflict?.()
        return
      }
      if (error.message === 'REGISTER_RATE_LIMITED') {
        options?.onRateLimited?.()
        return
      }
      if (error.message === 'REGISTER_VALIDATION') {
        options?.onValidationError?.()
        return
      }
      options?.onError?.(error)
    },
  })
}
