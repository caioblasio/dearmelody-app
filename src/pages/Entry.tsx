import {
  ChevronLeft,
  Download,
  Heart,
  Pause,
  Pencil,
  Play,
  Repeat,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGetDiaryEntry } from '@/api/diary/use-get-diary-entry'
import { PastMelodyMoodIcon } from '@/components/PastMelodyMoodIcon'
import { Button } from '@/components/ui/button'
import { ARCHIVE_CARD_SHELL_GEOMETRY, archiveCardShellNeutralClass } from '@/lib/archive-card-shell'
import { ApiError } from '@/lib/api-request'
import { getArchiveMoodTheme } from '@/lib/past-melody-archive-theme'
import { capitalizeMood, toMoodIcon } from '@/lib/past-melody-mood'
import { cn } from '@/lib/utils'

function formatDurationMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

function mockDurationSeconds(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) {
    h = (h + seed.charCodeAt(i) * (i + 1)) % 200
  }
  return 150 + h
}

function formatRecordedCaps(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    .format(d)
    .toUpperCase()
}

export function EntryPage() {
  const { entryId } = useParams<{ entryId: string }>()
  const { t, i18n } = useTranslation()
  const { data, isLoading, isError, error } = useGetDiaryEntry(entryId)

  const [playing, setPlaying] = useState(false)
  const [favoriteByEntryId, setFavoriteByEntryId] = useState<Record<string, boolean>>({})

  const is404 = error instanceof ApiError && error.status === 404

  const primaryMusic = data?.musics?.[0] ?? null
  let recordedDate: Date | null = null
  if (data?.createdAt) {
    const d = new Date(data.createdAt)
    recordedDate = Number.isNaN(d.getTime()) ? null : d
  }

  const theme = data ? getArchiveMoodTheme(toMoodIcon(data.mood)) : getArchiveMoodTheme('serene')

  const totalSec = data ? mockDurationSeconds(data.id) : 0
  const currentSec = Math.floor(totalSec * 0.42)
  const progressPct = totalSec > 0 ? Math.min(100, Math.round((currentSec / totalSec) * 100)) : 0

  const favorite = data
    ? data.id in favoriteByEntryId
      ? favoriteByEntryId[data.id]
      : Boolean(data.favorite)
    : false

  function toggleFavorite() {
    if (!data) return
    setFavoriteByEntryId((prev) => {
      const prior = data.id in prev ? prev[data.id] : Boolean(data.favorite)
      return { ...prev, [data.id]: !prior }
    })
  }

  const lyricsText = primaryMusic?.lyrics?.trim() || data?.entry || ''

  const moodLabel = capitalizeMood(data?.mood ?? '')

  async function onShare() {
    const shareData = {
      title: data?.title,
      text: data?.entry?.slice(0, 280),
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      }
    } catch {
      /* user cancelled or clipboard denied */
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <Link
        to="/melodies"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        <ChevronLeft className="size-4 shrink-0" aria-hidden />
        {t('entry.backToArchive')}
      </Link>

      {isLoading && (
        <p className="text-sm text-on-surface-variant" role="status" aria-live="polite">
          {t('entry.loading')}
        </p>
      )}

      {isError && !is404 && (
        <p className="text-sm text-error" role="alert">
          {t('entry.error')}
        </p>
      )}

      {is404 && (
        <p className="text-sm text-on-surface-variant" role="status">
          {t('entry.notFound')}
        </p>
      )}

      {data && recordedDate && (
        <div className="space-y-8">
          <header className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  'text-[10px] font-semibold uppercase tracking-tight lg:text-[11px] lg:tracking-wide',
                  theme.date
                )}
              >
                {t('entry.recorded', { date: formatRecordedCaps(recordedDate, i18n.language) })}
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  aria-pressed={favorite}
                  aria-label={favorite ? t('entry.unfavorite') : t('entry.favorite')}
                  className={cn(
                    'rounded-full border border-outline-variant/60 bg-surface-container-lowest p-1.5 text-on-surface-variant transition-colors hover:text-secondary',
                    favorite && 'text-secondary'
                  )}
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={cn('size-3.5 lg:size-4', favorite && 'fill-secondary/60')}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    'flex items-center gap-1 rounded-full border px-2 py-0.5 lg:gap-1.5 lg:px-3 lg:py-1',
                    theme.moodPill
                  )}
                >
                  <PastMelodyMoodIcon mood={toMoodIcon(data.mood)} className="size-3.5 lg:size-4" />
                  <span className="max-w-[5.5rem] truncate text-[9px] font-semibold uppercase tracking-wider lg:max-w-none lg:text-[10px]">
                    {moodLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-semibold text-primary sm:text-4xl">
                {primaryMusic?.title ?? data.title}
              </h1>
              {primaryMusic?.title && primaryMusic.title !== data.title ? (
                <p className="text-base font-medium text-on-surface-variant">{data.title}</p>
              ) : null}
            </div>
          </header>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8">
            <article
              className={cn(
                ARCHIVE_CARD_SHELL_GEOMETRY,
                'gap-4 border shadow-sm transition-[box-shadow] motion-safe:duration-300 lg:shadow-md',
                'hover:shadow-xl motion-reduce:transition-none',
                'lg:col-span-1 lg:h-full lg:min-h-0',
                theme.card
              )}
            >
              <div
                className={cn(
                  'flex min-h-0 flex-col overflow-hidden rounded-2xl border border-black/5 shadow-inner ring-1 ring-black/5',
                  'aspect-[16/10] max-h-[min(52vh,28rem)]',
                  'lg:aspect-auto lg:max-h-none lg:w-full lg:min-h-[13rem] lg:flex-1 lg:basis-0'
                )}
              >
                {primaryMusic?.imageLocation ? (
                  <img
                    src={primaryMusic.imageLocation}
                    alt=""
                    className="h-full w-full min-h-0 flex-1 object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="flex min-h-[8rem] flex-1 items-center justify-center bg-surface-container-low text-on-surface-variant lg:min-h-[13rem]">
                    <Volume2 className="size-12 opacity-40" aria-hidden />
                  </div>
                )}
              </div>

              <div className="shrink-0 space-y-2">
                <div className="h-1 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] motion-safe:duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[11px] tabular-nums text-on-surface-variant lg:text-xs">
                  <span>{formatDurationMmSs(currentSec)}</span>
                  <span>{formatDurationMmSs(totalSec)}</span>
                </div>
              </div>

              <div
                className={cn(
                  'flex shrink-0 flex-col gap-3 border border-black/5 p-3 backdrop-blur-sm lg:rounded-2xl lg:p-4',
                  theme.player
                )}
              >
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:justify-between">
                  <button
                    type="button"
                    aria-label={t('entry.player.shuffle')}
                    className="inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-black/5 hover:text-primary"
                  >
                    <Shuffle className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label={t('entry.player.previous')}
                    className="inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-black/5 hover:text-primary"
                  >
                    <SkipBack className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label={playing ? t('entry.player.pause') : t('entry.player.play')}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-on-primary shadow-md transition-transform hover:scale-105 active:scale-95"
                    onClick={() => setPlaying((p) => !p)}
                  >
                    {playing ? (
                      <Pause className="size-5" aria-hidden />
                    ) : (
                      <Play className="size-5 translate-x-0.5" aria-hidden />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-label={t('entry.player.next')}
                    className="inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-black/5 hover:text-primary"
                  >
                    <SkipForward className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label={t('entry.player.repeat')}
                    className="inline-flex size-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-black/5 hover:text-primary"
                  >
                    <Repeat className="size-4" aria-hidden />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-on-surface-variant sm:justify-between">
                  <Volume2 className="size-4 shrink-0 opacity-70" aria-hidden />
                  <div className="h-1 min-w-0 flex-1 max-w-[12rem] overflow-hidden rounded-full bg-black/10 lg:max-w-none">
                    <div className="h-full w-[60%] rounded-full bg-primary/70" />
                  </div>
                </div>
              </div>
            </article>

            <article
              className={cn(
                archiveCardShellNeutralClass('flex min-h-0 flex-col gap-4 lg:col-span-2'),
                'lg:h-full lg:min-h-0'
              )}
            >
              <h2 className="shrink-0 font-serif text-lg font-semibold text-on-surface lg:text-xl">
                {t('entry.lyricsHeading')}
              </h2>
              <div className="min-h-0 flex-1 rounded-lg bg-[#fffaf2] px-4 py-4 text-on-surface lg:px-6 lg:py-5">
                <p className="whitespace-pre-wrap font-serif text-sm leading-relaxed lg:text-base lg:leading-relaxed">
                  {lyricsText}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Button type="button" variant="outline" className="gap-2" onClick={onShare}>
                  <Share2 className="size-4" aria-hidden />
                  {t('entry.share')}
                </Button>
                <Button type="button" variant="outline" className="gap-2" disabled>
                  <Pencil className="size-4" aria-hidden />
                  {t('entry.editLyrics')}
                </Button>
                <Button type="button" variant="outline" className="gap-2" disabled>
                  <Download className="size-4" aria-hidden />
                  {t('entry.download')}
                </Button>
              </div>
            </article>
          </div>

          {data.entry.trim() ? (
            <details className="rounded-lg border border-outline-variant/50 bg-surface-container-low/60 px-4 py-3">
              <summary className="cursor-pointer text-sm font-medium text-on-surface-variant [&::-webkit-details-marker]:hidden">
                {t('entry.originalEntry')}
              </summary>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-on-surface lg:text-base lg:leading-relaxed">
                {data.entry}
              </p>
            </details>
          ) : null}
        </div>
      )}
    </div>
  )
}
