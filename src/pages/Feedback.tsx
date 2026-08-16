import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { type FeedbackType } from '@/api/feedback/submit-feedback'
import { useSubmitFeedback } from '@/api/feedback/use-submit-feedback'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const FEEDBACK_TYPES: FeedbackType[] = ['feedback', 'bug', 'help', 'feature_request']

const TITLE_MAX_LENGTH = 255

export function FeedbackPage() {
  const { t } = useTranslation()
  const submitFeedback = useSubmitFeedback()

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [type, setType] = useState<FeedbackType | ''>('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const isSubmitting = submitFeedback.isPending
  const trimmedTitle = title.trim()
  const trimmedMessage = message.trim()
  const canSubmit = Boolean(trimmedTitle && trimmedMessage) && !isSubmitting

  async function handleSend() {
    if (!canSubmit) return

    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await submitFeedback.mutateAsync({
        title: trimmedTitle.slice(0, TITLE_MAX_LENGTH),
        message: trimmedMessage,
        ...(type ? { type } : {}),
      })
      setTitle('')
      setMessage('')
      setType('')
      setSubmitSuccess(true)
    } catch {
      setSubmitError(t('feedback.error'))
    }
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          to="/profile"
          aria-label={t('feedback.backToProfile')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          {t('feedback.backToProfile')}
        </Link>

        <header className="space-y-2">
          <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
            {t('feedback.title')}
          </h1>
          <p className="text-muted">{t('feedback.subtitle')}</p>
        </header>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="feedback-title" className="text-[13px] font-semibold text-body">
            {t('feedback.titleLabel')}
          </Label>
          <Input
            id="feedback-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('feedback.titlePlaceholder')}
            className="rounded-[14px]"
            autoComplete="off"
            maxLength={TITLE_MAX_LENGTH}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="feedback-message" className="text-[13px] font-semibold text-body">
            {t('feedback.messageLabel')}
          </Label>
          <Textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('feedback.messagePlaceholder')}
            className="rounded-[14px]"
            rows={6}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="feedback-type" className="text-[13px] font-semibold text-body">
            {t('feedback.typeLabel')}
          </Label>
          <select
            id="feedback-type"
            value={type}
            onChange={(e) => setType(e.target.value as FeedbackType | '')}
            disabled={isSubmitting}
            className={cn(
              'flex h-12 w-full appearance-none rounded-[14px] border border-warm-border bg-card-bg px-4 py-3 text-base text-ink outline-none transition-all duration-200',
              'focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/20',
              'disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              !type && 'text-muted',
            )}
          >
            <option value="">{t('feedback.typeNone')}</option>
            {FEEDBACK_TYPES.map((value) => (
              <option key={value} value={value}>
                {t(`feedback.types.${value}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {submitError ? <Alert variant="destructive">{submitError}</Alert> : null}
      {submitSuccess ? <Alert>{t('feedback.success')}</Alert> : null}

      <div className="flex justify-end border-t border-warm-border pt-6">
        <Button
          type="button"
          onClick={() => void handleSend()}
          disabled={!canSubmit}
          className="min-w-[10rem] rounded-full"
        >
          {isSubmitting ? t('feedback.sending') : t('feedback.send')}
        </Button>
      </div>
    </section>
  )
}
