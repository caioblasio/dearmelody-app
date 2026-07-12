import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { AuthFooter } from '../components/AuthFooter'
import { AuthHeader } from '../components/AuthHeader'
import { SocialLoginButtons } from '../components/SocialLoginButtons'
import { Alert } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { useLogin } from '@/api/auth/use-login'
import type { TFunction } from 'i18next'

function createLoginSchema(t: TFunction) {
  return z.object({
    email: z.email(t('login.validation.email')),
    password: z.string().min(8, t('login.validation.passwordMin')),
    remember: z.boolean(),
  })
}

type LoginFormValues = {
  email: string
  password: string
  remember: boolean
}

export function LoginPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])

  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

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
    onInvalidCredentials: () => {
      setAuthError(t('login.errors.invalidCredentials'))
    },
    onError: () => {
      setAuthError(t('login.errors.generic'))
    },
  })

  const onSubmit = handleSubmit((values) => {
    setAuthError(null)
    loginMutation.mutate(values)
  })

  return (
    <div className="flex min-h-screen flex-col bg-surface selection:bg-chip-bg selection:text-ink">
      <AuthHeader />
      <main className="relative flex flex-grow items-center justify-center px-6 py-10 sm:py-16">
        <div className="relative w-full min-w-0 max-w-md">
          <Card className="w-full shadow-md">
            <div className="mb-6 text-center sm:mb-8">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl btn-coral-gradient">
                <span className="font-heading text-xl text-on-primary">♪</span>
              </div>
              <h1 className="mb-2 font-heading text-3xl font-semibold text-ink">{t('login.heading')}</h1>
              <p className="text-muted">{t('login.subheading')}</p>
            </div>

            {authError && (
              <Alert className="mb-6" aria-live="polite">
                {authError}
              </Alert>
            )}

            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">{t('login.emailLabel')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
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

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <Label htmlFor="password">{t('login.passwordLabel')}</Label>
                  <a className="shrink-0 text-sm font-semibold text-coral hover:underline" href="#">
                    {t('login.forgotPassword')}
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('login.passwordPlaceholder')}
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
                    aria-label={showPassword ? t('aria.hidePassword') : t('aria.showPassword')}
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
                className="w-full py-4 font-heading text-lg"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? t('login.submitPending') : t('login.submitIdle')}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card-bg px-4 text-xs font-medium tracking-widest text-sand uppercase">
                  {t('login.orSignInWith')}
                </span>
              </div>
            </div>

            <SocialLoginButtons />
          </Card>

          <p className="mt-6 text-center text-muted">
            {t('login.ctaLead')}{' '}
            <a className="font-bold text-coral hover:underline" href="#">
              {t('login.ctaLink')}
            </a>
          </p>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
