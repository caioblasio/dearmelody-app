import { useMemo } from 'react'
import { WandSparkles } from 'lucide-react'
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

function createEntrySchema(t: TFunction) {
  return z.object({
    reflection: z
      .string()
      .min(10, t('newEntry.validation.reflectionMin'))
      .max(2000, t('newEntry.validation.reflectionMax')),
    resonance: z.enum(NEW_ENTRY_RESONANCE_IDS),
  })
}

type EntryFormValues = {
  reflection: string
  resonance: EntryResonanceId
}

function formatDateCompact(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(d)
}

function formatDateCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

export function NewEntryPage() {
  const { t, i18n } = useTranslation()
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
      reflection: '',
      resonance: NEW_ENTRY_RESONANCE_IDS[0],
    },
  })

  const selectedResonance = watch('resonance')
  const { mutate: createNewEntry, isPending } = useNewEntry()

  const today = useMemo(() => new Date(), [])
  const dateCompact = formatDateCompact(today, i18n.language)
  const dateCaps = formatDateCaps(today, i18n.language)

  const onSubmit = handleSubmit(async (values) => {
    createNewEntry({
      reflection: values.reflection,
      resonance: values.resonance,
    })
  })

  return (
    <article className={archiveCardShellNeutralClass('space-y-6')}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-tight text-on-surface-variant/85 lg:text-[11px] lg:tracking-wide">
          <span className="lg:hidden">{dateCompact}</span>
          <span className="hidden lg:inline">{dateCaps}</span>
        </span>
        <span className="shrink-0 rounded-full border border-primary/20 bg-primary-container/90 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-on-primary-container lg:px-3 lg:py-1 lg:text-[10px]">
          {t('newEntry.badge')}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-xl font-semibold leading-tight text-on-surface lg:text-3xl">
          {t('newEntry.heading')}
        </h1>
        <p className="text-sm text-on-surface-variant lg:text-base">{t('newEntry.subheading')}</p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <label className="block space-y-2">
          <div className="relative rounded-lg bg-[#fffaf2] px-4 py-2">
            <div className="pointer-events-none absolute bottom-2 left-8 top-2 w-px bg-red-300/70" />
            <textarea
              rows={9}
              placeholder={t('newEntry.textareaPlaceholder')}
              className="relative w-full resize-none bg-transparent pl-8 pr-0 text-base leading-8 text-on-surface outline-none placeholder:text-on-surface-variant/70 [background-image:linear-gradient(to_bottom,transparent_31px,theme(colors.outline-variant)_32px)] [background-size:100%_32px] focus-visible:ring-0"
              aria-invalid={Boolean(errors.reflection)}
              aria-describedby={errors.reflection ? 'reflection-error' : undefined}
              {...register('reflection')}
            />
          </div>
          {errors.reflection && (
            <p id="reflection-error" className="text-sm text-error" role="alert">
              {errors.reflection.message}
            </p>
          )}
        </label>

        <div className="space-y-3">
          <p className="text-sm font-medium text-on-surface">{t('newEntry.resonanceLabel')}</p>
          <div className="flex flex-wrap gap-2">
            {NEW_ENTRY_RESONANCE_IDS.map((id) => {
              const isSelected = selectedResonance === id

              return (
                <button
                  key={id}
                  type="button"
                  className={cn(
                    'rounded-full border px-3 py-1 text-sm transition-colors',
                    isSelected
                      ? 'border-primary bg-primary-container text-on-primary-container'
                      : 'border-outline-variant bg-surface-container text-on-surface-variant hover:border-primary/50',
                  )}
                  aria-pressed={isSelected}
                  onClick={() => setValue('resonance', id, { shouldValidate: true })}
                >
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
          className="w-full gap-2 sm:w-auto"
          disabled={isSubmitting || isPending}
        >
          <WandSparkles className="h-4 w-4" />
          {isPending ? t('newEntry.generating') : t('newEntry.generate')}
        </Button>
      </form>
    </article>
  )
}
