import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'

import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthMobileHeader } from '@/components/auth/AuthMobileHeader'
import { AuthSplitShell } from '@/components/auth/AuthSplitShell'
import { SocialLoginButtons } from '@/components/SocialLoginButtons'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useLogin } from '@/api/auth/use-login'

function createLoginSchema(t: TFunction) {
  return z.object({
    email: z.email(t('login.validation.email')),
    password: z.string().min(8, t('login.validation.passwordMin')),
  })
}

type LoginFormValues = {
  email: string
  password: string
}

type LoginLocationState = {
  registered?: boolean
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const loginSchema = useMemo(() => createLoginSchema(t), [t])
  const locationState = location.state as LoginLocationState | null

  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [showRegisteredBanner] = useState(() => Boolean(locationState?.registered))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
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
    <AuthSplitShell
      brandSide="left"
      brand={<AuthBrandPanel variant="login" />}
      mobileHeader={<AuthMobileHeader variant="login" />}
    >
      <div className="mb-6 hidden md:block">
        <h1 className="font-heading text-[30px] font-semibold tracking-[-0.4px] text-ink">
          {t('login.heading')}
        </h1>
        <p className="mt-1.5 text-[15px] text-muted">{t('login.subheading')}</p>
      </div>

      {showRegisteredBanner && (
        <Alert className="mb-5 border-coral/30 bg-chip-bg text-ink" aria-live="polite">
          {t('login.registeredSuccess')}
        </Alert>
      )}

      {authError && (
        <Alert className="mb-5" aria-live="polite">
          {authError}
        </Alert>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[13px] font-semibold text-body">
            {t('login.emailLabel')}
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('login.emailPlaceholder')}
            className="rounded-[14px]"
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

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <Label htmlFor="password" className="text-[13px] font-semibold text-body">
              {t('login.passwordLabel')}
            </Label>
            <a className="shrink-0 text-sm font-semibold text-coral hover:text-[#E0603F] hover:underline" href="#">
              {t('login.forgotPassword')}
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder={t('login.passwordPlaceholder')}
              className="rounded-[14px] pr-12"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 p-0 text-muted"
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
          className="auth-btn-shadow mt-2 w-full py-4 font-heading text-lg hover:scale-100"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? t('login.submitPending') : t('login.submitIdle')}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="bg-border-dashed" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface px-4 text-xs font-medium tracking-wide text-muted lowercase">
            {t('login.orContinueWith')}
          </span>
        </div>
      </div>

      <SocialLoginButtons />

      <p className="mt-6 text-center text-[15px] text-muted">
        {t('login.ctaLead')}{' '}
        <Link className="font-bold text-coral hover:text-[#E0603F] hover:underline" to="/signup">
          {t('login.ctaLink')}
        </Link>
      </p>
    </AuthSplitShell>
  )
}
