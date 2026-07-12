import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { z } from 'zod'

import { useNewEntry } from '@/api/diary/use-new-entry'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NEW_ENTRY_GENRE_IDS = ['indieFolk', 'dreamyPop', 'piano'] as const
type EntryGenreId = (typeof NEW_ENTRY_GENRE_IDS)[number]

function createEntrySchema(t: TFunction) {
  return z.object({
    entry: z
      .string()
      .min(10, t('newEntry.validation.entryMin'))
      .max(2000, t('newEntry.validation.entryMax')),
    genre: z.enum(NEW_ENTRY_GENRE_IDS),
  })
}

type EntryFormValues = {
  entry: string
  genre: EntryGenreId
}

function formatDateCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

export function NewEntryPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const entrySchema = useMemo(() => createEntrySchema(t), [t])
  const placeholderText = useMemo(() => {
    const fromUrl = searchParams.get('placeholder')?.trim()
    return fromUrl || t('newEntry.textareaPlaceholder')
  }, [searchParams, t])

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      entry: '',
      genre: NEW_ENTRY_GENRE_IDS[0],
    },
  })

  const selectedGenre = watch('genre')
  const { mutate: createNewEntry, isPending } = useNewEntry({
    onSuccess: (data) => {
      navigate(`/melodies/${data.id}`)
    },
  })

  const today = useMemo(() => new Date(), [])
  const dateCaps = formatDateCaps(today, i18n.language)

  const onSubmit = handleSubmit(async (values) => {
    createNewEntry({
      entry: values.entry,
      genre: values.genre,
    })
  })

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 md:block md:space-y-8">
      <header className="shrink-0 space-y-3">
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

      <form className="flex min-h-0 flex-1 flex-col gap-4 md:block md:space-y-6" onSubmit={onSubmit}>
        <label className="flex min-h-0 flex-1 flex-col gap-2 md:block md:space-y-2">
          <textarea
            placeholder={placeholderText}
            className="diary-notebook-field diary-notebook-field--fill w-full resize-none text-body caret-coral outline-none"
            aria-invalid={Boolean(errors.entry)}
            aria-describedby={errors.entry ? 'entry-error' : undefined}
            {...register('entry')}
          />
          {errors.entry && (
            <p id="entry-error" className="shrink-0 text-sm text-error" role="alert">
              {errors.entry.message}
            </p>
          )}
        </label>

        <div className="flex shrink-0 flex-wrap items-center gap-3 rounded-[20px] border border-warm-border bg-card-bg px-5 py-4 sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-sm font-medium text-muted">{t('newEntry.soundLabel')}</span>
            <div className="flex flex-wrap gap-2">
              {NEW_ENTRY_GENRE_IDS.map((id) => {
                const isSelected = selectedGenre === id

                return (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      'rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors',
                      isSelected
                        ? 'bg-chip-bg text-coral'
                        : 'border border-warm-border text-muted hover:border-peach',
                    )}
                    aria-pressed={isSelected}
                    onClick={() => setValue('genre', id, { shouldValidate: true })}
                  >
                    {t(`newEntry.genres.${id}`)}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        {errors.genre && (
          <p className="shrink-0 text-sm text-error" role="alert">
            {errors.genre.message}
          </p>
        )}

        <div className="flex shrink-0 justify-center">
          <Button
            type="submit"
            size="lg"
            className="w-full max-w-md py-4 font-heading text-xl hover:scale-[1.03]"
            disabled={isSubmitting || isPending}
          >
            {isPending ? t('newEntry.generating') : `♪ ${t('newEntry.generate')}`}
          </Button>
        </div>
      </form>
    </div>
  )
}
