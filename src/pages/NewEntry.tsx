import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { z } from 'zod'

import { useNewEntry } from '@/api/diary/use-new-entry'
import { Button } from '@/components/ui/button'
import { archiveCardShellNeutralClass } from '@/lib/archive-card-shell'
import { cn } from '@/lib/utils'

const NEW_ENTRY_RESONANCE_IDS = ['melancholic', 'ethereal', 'uplifting', 'cinematic'] as const
type EntryResonanceId = (typeof NEW_ENTRY_RESONANCE_IDS)[number]

const RESONANCE_CHIP_COLORS: Record<
  EntryResonanceId,
  { dot: string; selected: string; idle: string }
> = {
  melancholic: {
    dot: 'bg-plum-light',
    selected: 'border-butter bg-butter-bg text-ink',
    idle: 'border-warm-border bg-card-bg text-muted hover:border-peach',
  },
  ethereal: {
    dot: 'bg-plum-light',
    selected: 'border-butter bg-butter-bg text-ink',
    idle: 'border-warm-border bg-card-bg text-muted hover:border-peach',
  },
  uplifting: {
    dot: 'bg-butter',
    selected: 'border-butter bg-butter-bg text-ink',
    idle: 'border-warm-border bg-card-bg text-muted hover:border-peach',
  },
  cinematic: {
    dot: 'bg-[#7A8BB0]',
    selected: 'border-butter bg-butter-bg text-ink',
    idle: 'border-warm-border bg-card-bg text-muted hover:border-peach',
  },
}

function createEntrySchema(t: TFunction) {
  return z.object({
    title: z.string().max(255, t('newEntry.validation.titleMax')),
    entry: z
      .string()
      .min(10, t('newEntry.validation.entryMin'))
      .max(2000, t('newEntry.validation.entryMax')),
    resonance: z.enum(NEW_ENTRY_RESONANCE_IDS),
  })
}

type EntryFormValues = {
  title: string
  entry: string
  resonance: EntryResonanceId
}

function formatDateCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

export function NewEntryPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const entrySchema = useMemo(() => createEntrySchema(t), [t])

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: '',
      entry: '',
      resonance: NEW_ENTRY_RESONANCE_IDS[0],
    },
  })

  const selectedResonance = watch('resonance')
  const { mutate: createNewEntry, isPending } = useNewEntry({
    onSuccess: (data) => {
      navigate(`/melodies/${data.id}`)
    },
  })

  const today = useMemo(() => new Date(), [])
  const dateCaps = formatDateCaps(today, i18n.language)

  const onSubmit = handleSubmit(async (values) => {
    createNewEntry({
      title: values.title,
      entry: values.entry,
      resonance: values.resonance,
    })
  })

  return (
    <div className="mx-auto max-w-[680px] space-y-8">
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm tracking-wide text-sand">{dateCaps}</span>
          <span className="shrink-0 rounded-full border border-warm-border bg-card-bg px-4 py-1.5 text-sm font-semibold text-muted">
            {t('newEntry.badge')}
          </span>
        </div>

        <h1 className="font-heading text-[2.625rem] font-semibold leading-tight text-ink">
          {t('newEntry.heading')}
        </h1>
      </header>

      <article className={archiveCardShellNeutralClass('space-y-6 bg-transparent p-0 shadow-none')}>
        <form className="space-y-6" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <span className="label-caps text-muted">{t('newEntry.titleLabel')}</span>
            <input
              type="text"
              maxLength={255}
              placeholder={t('newEntry.titlePlaceholder')}
              className="w-full rounded-2xl border border-warm-border bg-card-bg px-4 py-3 font-heading text-lg font-semibold text-ink outline-none placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-muted focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/20"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'title-error' : undefined}
              {...register('title')}
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-error" role="alert">
                {errors.title.message}
              </p>
            )}
          </label>

          <label className="block space-y-2">
            <textarea
              rows={9}
              placeholder={t('newEntry.textareaPlaceholder')}
              className="w-full resize-none rounded-2xl border border-warm-border bg-card-bg px-5 py-4 text-[1.1875rem] leading-[1.75] text-body caret-coral outline-none placeholder:text-muted focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/20"
              aria-invalid={Boolean(errors.entry)}
              aria-describedby={errors.entry ? 'entry-error' : undefined}
              {...register('entry')}
            />
            {errors.entry && (
              <p id="entry-error" className="text-sm text-error" role="alert">
                {errors.entry.message}
              </p>
            )}
          </label>

          <div className="space-y-3">
            <p className="label-caps text-muted">{t('newEntry.resonanceLabel')}</p>
            <div className="flex flex-wrap gap-2">
              {NEW_ENTRY_RESONANCE_IDS.map((id) => {
                const isSelected = selectedResonance === id
                const colors = RESONANCE_CHIP_COLORS[id]

                return (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors',
                      isSelected ? colors.selected : colors.idle,
                    )}
                    aria-pressed={isSelected}
                    onClick={() => setValue('resonance', id, { shouldValidate: true })}
                  >
                    <span className={cn('size-2.5 rounded-full', colors.dot)} aria-hidden />
                    {t(`newEntry.resonance.${id}`)}
                  </button>
                )
              })}
            </div>
            {errors.resonance && (
              <p className="text-sm text-error" role="alert">
                {errors.resonance.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full py-4 font-heading text-xl hover:scale-[1.03]"
            disabled={isSubmitting || isPending}
          >
            {isPending ? t('newEntry.generating') : `♪ ${t('newEntry.generate')}`}
          </Button>
        </form>
      </article>
    </div>
  )
}
