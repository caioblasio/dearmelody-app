import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { TFunction } from 'i18next'
import { z } from 'zod'

import { useNewEntry } from '@/api/diary/use-new-entry'
import { GenrePicker } from '@/components/genre-picker/GenrePicker'
import { Button } from '@/components/ui/button'
import { useMelodyGeneration } from '@/lib/melody-generation/use-melody-generation'
import {
  clearNewEntryDraft,
  loadNewEntryDraft,
  saveNewEntryDraft,
} from '@/lib/new-entry-draft'

function createEntrySchema(t: TFunction) {
  return z.object({
    entry: z
      .string()
      .min(10, t('newEntry.validation.entryMin'))
      .max(2000, t('newEntry.validation.entryMax')),
    musicStyle: z.string().min(1, t('newEntry.validation.musicStyleRequired')),
  })
}

type EntryFormValues = {
  entry: string
  musicStyle: string
}

function formatDateCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

function autosizeTextarea(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

export function NewEntryPage() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { isComposing, entryId: composingEntryId, startComposing } = useMelodyGeneration()
  const entrySchema = useMemo(() => createEntrySchema(t), [t])
  const placeholderText = useMemo(() => {
    const fromUrl = searchParams.get('placeholder')?.trim()
    return fromUrl || t('newEntry.textareaPlaceholder')
  }, [searchParams, t])

  const [defaultValues] = useState<EntryFormValues>(() => {
    const draft = loadNewEntryDraft()
    return {
      entry: draft?.entry ?? '',
      musicStyle: draft?.musicStyle ?? '',
    }
  })

  const {
    register,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues,
  })

  const { ref: entryRegisterRef, onChange: entryOnChange, ...entryRegister } = register('entry')
  const entryTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  useLayoutEffect(() => {
    if (entryTextareaRef.current) autosizeTextarea(entryTextareaRef.current)
  }, [placeholderText, defaultValues.entry])

  const entryValue = watch('entry')
  const selectedMusicStyle = watch('musicStyle')
  const hasDraftContent = Boolean(entryValue.trim() || selectedMusicStyle.trim())

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      saveNewEntryDraft({ entry: entryValue, musicStyle: selectedMusicStyle })
    }, 300)
    return () => window.clearTimeout(timeoutId)
  }, [entryValue, selectedMusicStyle])

  const { mutate: createNewEntry, isPending } = useNewEntry({
    onSuccess: (data) => {
      clearNewEntryDraft()
      startComposing(data.id)
      navigate(`/melodies/${data.id}`)
    },
  })

  const today = useMemo(() => new Date(), [])
  const dateCaps = formatDateCaps(today, i18n.language)

  const onClearDraft = () => {
    clearNewEntryDraft()
    reset({ entry: '', musicStyle: '' })
    if (entryTextareaRef.current) autosizeTextarea(entryTextareaRef.current)
  }

  const onSubmit = handleSubmit(async (values) => {
    if (isComposing) return
    createNewEntry({
      entry: values.entry,
      music_style: values.musicStyle,
    })
  })

  if (isComposing && composingEntryId) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-start justify-center gap-4 py-10">
        <p className="max-w-md text-sm leading-relaxed text-muted" role="status">
          {t('melodyGeneration.createBlocked')}
        </p>
        <Link
          to={`/melodies/${composingEntryId}`}
          className="font-heading text-base font-semibold text-coral transition-colors hover:text-coral-light"
        >
          {t('melodyGeneration.createBlockedLink')}
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
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

      <form className="space-y-6" onSubmit={onSubmit}>
        <label className="block space-y-2">
          <textarea
            placeholder={placeholderText}
            className="diary-notebook-field w-full resize-none text-body caret-coral outline-none"
            aria-invalid={Boolean(errors.entry)}
            aria-describedby={errors.entry ? 'entry-error' : undefined}
            {...entryRegister}
            ref={(el) => {
              entryRegisterRef(el)
              entryTextareaRef.current = el
              if (el) autosizeTextarea(el)
            }}
            onChange={(event) => {
              void entryOnChange(event)
              autosizeTextarea(event.currentTarget)
            }}
          />
          {errors.entry && (
            <p id="entry-error" className="text-sm text-error" role="alert">
              {errors.entry.message}
            </p>
          )}
        </label>

        <div className="flex flex-wrap items-center gap-3 rounded-[20px] border border-warm-border bg-card-bg px-5 py-4 sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="text-sm font-medium text-muted">{t('newEntry.soundLabel')}</span>
            <GenrePicker
              value={selectedMusicStyle || undefined}
              onChange={(label) => setValue('musicStyle', label, { shouldValidate: true })}
              error={Boolean(errors.musicStyle)}
            />
          </div>
        </div>
        {errors.musicStyle && (
          <p className="text-sm text-error" role="alert">
            {errors.musicStyle.message}
          </p>
        )}

        <div className="mx-auto flex w-full max-w-md flex-col items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearDraft}
            disabled={!hasDraftContent || isSubmitting || isPending}
          >
            {t('newEntry.clear')}
          </Button>
          <Button
            type="submit"
            size="lg"
            className="w-full py-4 font-heading text-xl hover:scale-[1.03]"
            disabled={isSubmitting || isPending}
          >
            {isPending ? t('newEntry.generating') : `♪ ${t('newEntry.generate')}`}
          </Button>
        </div>
      </form>
    </div>
  )
}
