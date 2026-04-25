import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { BookOpenText, Eye, EyeOff } from 'lucide-react'

import { AuthFooter } from '../components/AuthFooter'
import { AuthHeader } from '../components/AuthHeader'
import { SocialLoginButtons } from '../components/SocialLoginButtons'
import { Alert } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { getLockRemainingMs } from '@/api/auth/login'
import { useLogin } from '@/api/auth/use-login'

const loginSchema = z.object({
  email: z.email('Please enter a valid email address.'),
  password: z.string().min(8, 'Password must contain at least 8 characters.'),
  remember: z.boolean(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [lockRemainingMs, setLockRemainingMs] = useState(getLockRemainingMs())

  const lockSeconds = useMemo(() => Math.ceil(lockRemainingMs / 1000), [lockRemainingMs])
  const isLocked = lockRemainingMs > 0

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true,
    },
  })

  const loginMutation = useLogin({
    onSuccess: () => {
      setAuthError(null)
      navigate('/')
    },
    onLockedOut: (remainingMs) => {
      setAuthError('Too many attempts. Please wait before trying again.')
      setLockRemainingMs(remainingMs)
    },
    onInvalidCredentials: () => {
      setAuthError('Incorrect email or password.')
    },
    onError: () => {
      setAuthError('Something went wrong. Please try again.')
    },
  })

  useEffect(() => {
    if (!isLocked) return
    const timer = window.setInterval(() => {
      setLockRemainingMs(getLockRemainingMs())
    }, 1000)
    return () => window.clearInterval(timer)
  }, [isLocked])

  const onSubmit = handleSubmit((values) => {
    setAuthError(null)
    loginMutation.mutate(values)
  })

  return (
    <div className="flex min-h-screen flex-col bg-white selection:bg-secondary-container selection:text-on-secondary-container">
      <AuthHeader />
      <main className="relative flex flex-grow items-center justify-center overflow-hidden px-6 py-xl">
        <div className="relative w-full max-w-4xl">
          <Card>
            <div className="mb-lg text-center">
              <BookOpenText className="h-8 w-8 text-primary" />
              <h1 className="mb-2 text-3xl font-bold text-on-surface">Log in to Melodiary</h1>
              <p className="italic text-on-surface-variant">Continue your musical journey...</p>
            </div>

            {authError && (
              <Alert className="mb-md" aria-live="polite">
                {authError}
              </Alert>
            )}

            <form className="space-y-md" onSubmit={onSubmit}>
              <div className="space-y-xs">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-error" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-xs">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a className="text-sm font-medium text-primary hover:underline" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pr-12"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p id="password-error" className="text-sm text-error" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2 py-4 shadow-md active:scale-[0.98]"
                disabled={loginMutation.isPending || isLocked}
              >
                <span className="font-serif text-lg italic">
                  {loginMutation.isPending ? 'Entering...' : 'Enter Journal'}
                </span>
              </Button>

              {isLocked && (
                <p className="text-sm text-error" role="status" aria-live="polite">
                  Try again in {lockSeconds}s.
                </p>
              )}
            </form>

            <div className="relative my-md">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-container-lowest px-4 font-medium tracking-widest text-outline">
                  Or Sign In With
                </span>
              </div>
            </div>

            <SocialLoginButtons />
          </Card>

          <p className="mt-md text-center text-on-surface-variant">
            New to the diary?{' '}
            <a className="font-bold text-secondary hover:underline" href="#">
              Start your reflection
            </a>
          </p>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
