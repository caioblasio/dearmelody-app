import { useTranslation } from 'react-i18next'

import { scorePasswordStrength } from '@/lib/password-strength'
import { cn } from '@/lib/utils'

const COLORS = {
  1: '#E0603F',
  2: '#FFB000',
  3: '#1F8A5B',
} as const

type PasswordStrengthMeterProps = {
  password: string
  className?: string
}

export function PasswordStrengthMeter({ password, className }: PasswordStrengthMeterProps) {
  const { t } = useTranslation()
  const score = scorePasswordStrength(password)

  if (!password) return null

  const activeColor = COLORS[score]
  const labelKey =
    score === 1 ? 'signup.strength.weak' : score === 2 ? 'signup.strength.fair' : 'signup.strength.strong'

  return (
    <div className={cn('space-y-1.5', className)} aria-live="polite">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-colors duration-200"
            style={{ backgroundColor: i < score ? activeColor : '#EADFCE' }}
          />
        ))}
      </div>
      <p className="text-xs font-semibold" style={{ color: activeColor }}>
        {t(labelKey)}
      </p>
    </div>
  )
}
