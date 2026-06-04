import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { BookOpenText, Eye, EyeOff } from 'lucide-react'
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
    <div className="flex min-h-screen flex-col bg-white selection:bg-secondary-container selection:text-on-secondary-container">
      <AuthHeader />
      <main className="relative flex flex-grow items-center justify-center overflow-hidden px-6 py-xl">
        <div className="relative w-full max-w-4xl">
          <Card>
            <div className="mb-lg text-center">
              <BookOpenText className="h-8 w-8 text-primary" />
              <h1 className="mb-2 text-3xl font-bold text-on-surface">{t('login.heading')}</h1>
              <p className="italic text-on-surface-variant">{t('login.subheading')}</p>
            </div>

            {authError && (
              <Alert className="mb-md" aria-live="polite">
                {authError}
              </Alert>
            )}

            <form className="space-y-md" onSubmit={onSubmit}>
              <div className="space-y-xs">
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

              <div className="space-y-xs">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('login.passwordLabel')}</Label>
                  <a className="text-sm font-medium text-primary hover:underline" href="#">
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
                className="w-full gap-2 py-4 shadow-md active:scale-[0.98]"
                disabled={loginMutation.isPending}
              >
                <span className="font-serif text-lg italic">
                  {loginMutation.isPending ? t('login.submitPending') : t('login.submitIdle')}
                </span>
              </Button>
            </form>

            <div className="relative my-md">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-container-lowest px-4 font-medium tracking-widest text-outline">
                  {t('login.orSignInWith')}
                </span>
              </div>
            </div>

            <SocialLoginButtons />
          </Card>

          <p className="mt-md text-center text-on-surface-variant">
            {t('login.ctaLead')}{' '}
            <a className="font-bold text-secondary hover:underline" href="#">
              {t('login.ctaLink')}
            </a>
          </p>
        </div>
      </main>
      <AuthFooter />
    </div>
  )
}
