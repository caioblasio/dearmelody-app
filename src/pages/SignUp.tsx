import { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'

import { useRegister } from '@/api/auth/use-register'
import { AuthBrandPanel } from '@/components/auth/AuthBrandPanel'
import { AuthMobileHeader } from '@/components/auth/AuthMobileHeader'
import { AuthSplitShell } from '@/components/auth/AuthSplitShell'
import { PasswordStrengthMeter } from '@/components/auth/PasswordStrengthMeter'
import { SocialLoginButtons } from '@/components/SocialLoginButtons'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function createSignUpSchema(t: TFunction) {
  return z.object({
    firstName: z.string().trim().min(1, t('signup.validation.firstName')),
    lastName: z.string().trim().min(1, t('signup.validation.lastName')),
    email: z.email(t('signup.validation.email')),
    password: z.string().min(12, t('signup.validation.passwordMin')),
    inviteCode: z.string().trim().min(1, t('signup.validation.inviteCode')),
    agree: z.boolean().refine((value) => value, {
      message: t('signup.errors.mustAgree'),
    }),
  })
}

type SignUpFormValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  inviteCode: string
  agree: boolean
}

export function SignUpPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const signUpSchema = useMemo(() => createSignUpSchema(t), [t])

  const [showPassword, setShowPassword] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      inviteCode: '',
      agree: false,
    },
  })

  const passwordRegister = register('password')

  const registerMutation = useRegister({
    onSuccess: () => {
      setFormError(null)
      navigate('/login', { state: { registered: true } })
    },
    onConflict: () => {
      setFormError(t('signup.errors.conflict'))
    },
    onRateLimited: () => {
      setFormError(t('signup.errors.rateLimited'))
    },
    onValidationError: () => {
      setFormError(t('signup.errors.generic'))
    },
    onError: () => {
      setFormError(t('signup.errors.generic'))
    },
  })

  const onSubmit = handleSubmit((values) => {
    setFormError(null)
    registerMutation.mutate({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      invite_code: values.inviteCode.trim().toUpperCase(),
    })
  })

  return (
    <AuthSplitShell
      brandSide="right"
      brand={<AuthBrandPanel variant="signup" />}
      mobileHeader={<AuthMobileHeader variant="signup" />}
    >
      <div className="mb-6 hidden md:block">
        <h1 className="font-heading text-[30px] font-semibold tracking-[-0.4px] text-ink">
          {t('signup.heading')}
        </h1>
        <p className="mt-1.5 text-[15px] text-muted">{t('signup.subheading')}</p>
      </div>

      {formError && (
        <Alert className="mb-5" aria-live="polite">
          {formError}
        </Alert>
      )}

      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-[13px] font-semibold text-body">
              {t('signup.firstNameLabel')}
            </Label>
            <Input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder={t('signup.firstNamePlaceholder')}
              className="rounded-[14px]"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby={errors.firstName ? 'firstName-error' : undefined}
              {...register('firstName')}
            />
            {errors.firstName && (
              <p id="firstName-error" className="text-sm text-error" role="alert">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-[13px] font-semibold text-body">
              {t('signup.lastNameLabel')}
            </Label>
            <Input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder={t('signup.lastNamePlaceholder')}
              className="rounded-[14px]"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby={errors.lastName ? 'lastName-error' : undefined}
              {...register('lastName')}
            />
            {errors.lastName && (
              <p id="lastName-error" className="text-sm text-error" role="alert">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[13px] font-semibold text-body">
            {t('signup.emailLabel')}
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('signup.emailPlaceholder')}
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
          <Label htmlFor="password" className="text-[13px] font-semibold text-body">
            {t('signup.passwordLabel')}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder={t('signup.passwordPlaceholder')}
              className="rounded-[14px] pr-12"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...passwordRegister}
              onChange={(event) => {
                void passwordRegister.onChange(event)
                setPasswordValue(event.target.value)
              }}
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
          <PasswordStrengthMeter password={passwordValue} />
          {errors.password && (
            <p id="password-error" className="text-sm text-error" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="inviteCode" className="text-[13px] font-semibold text-body">
            {t('signup.inviteCodeLabel')}
          </Label>
          <Input
            id="inviteCode"
            type="text"
            autoComplete="off"
            placeholder={t('signup.inviteCodePlaceholder')}
            className="rounded-[14px] uppercase"
            aria-invalid={Boolean(errors.inviteCode)}
            aria-describedby={errors.inviteCode ? 'inviteCode-error' : undefined}
            {...register('inviteCode')}
          />
          {errors.inviteCode && (
            <p id="inviteCode-error" className="text-sm text-error" role="alert">
              {errors.inviteCode.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5 pt-0.5">
          <Controller
            name="agree"
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-2.5">
                <Checkbox
                  className="mt-0.5 h-5 w-5 shrink-0 rounded-[7px] border-[#D8CDBF] accent-coral"
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  name={field.name}
                />
                <span className="text-sm leading-snug text-body">
                  {t('signup.agreeLead')}{' '}
                  <a className="font-semibold text-coral hover:underline" href="#">
                    {t('signup.termsLink')}
                  </a>{' '}
                  {t('signup.agreeAnd')}{' '}
                  <a className="font-semibold text-coral hover:underline" href="#">
                    {t('signup.privacyLink')}
                  </a>
                  {t('signup.agreeTrail')}
                </span>
              </label>
            )}
          />
          {errors.agree && (
            <p className="text-sm text-error" role="alert">
              {errors.agree.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="auth-btn-shadow mt-2 w-full py-4 font-heading text-base hover:scale-100 sm:text-lg"
          disabled={registerMutation.isPending}
        >
          <span className="hidden sm:inline">
            {registerMutation.isPending ? t('signup.submitPending') : t('signup.submitIdle')}
          </span>
          <span className="sm:hidden">
            {registerMutation.isPending ? t('signup.submitPending') : t('signup.submitMobile')}
          </span>
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-muted md:hidden">{t('signup.reassurance')}</p>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="bg-border-dashed" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-surface px-4 text-xs font-medium tracking-wide text-muted lowercase">
            {t('signup.orSignUpWith')}
          </span>
        </div>
      </div>

      <SocialLoginButtons labelKey="social.googleSignUp" />

      <p className="mt-6 text-center text-[15px] text-muted">
        {t('signup.ctaLead')}{' '}
        <Link className="font-bold text-coral hover:text-[#E0603F] hover:underline" to="/login">
          {t('signup.ctaLink')}
        </Link>
      </p>
    </AuthSplitShell>
  )
}
