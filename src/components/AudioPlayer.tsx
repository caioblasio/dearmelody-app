import { Loader2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { getMusicStream } from '@/api/music/get-music-stream'
import { Slider } from '@/components/ui/slider'
import { ApiError } from '@/lib/api-request'
import { cn } from '@/lib/utils'

function formatDurationMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

function waitForAudioMetadata(audio: HTMLAudioElement): Promise<void> {
  if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const onReady = () => {
      cleanup()
      resolve()
    }
    const onError = () => {
      cleanup()
      reject(new Error('Audio metadata failed to load'))
    }
    const cleanup = () => {
      audio.removeEventListener('loadedmetadata', onReady)
      audio.removeEventListener('error', onError)
    }

    audio.addEventListener('loadedmetadata', onReady)
    audio.addEventListener('error', onError)
  })
}

type AudioPlayerProps = {
  musicId: number
  controlsClassName?: string
  variant?: 'default' | 'warm'
}

export function AudioPlayer({ musicId, controlsClassName, variant = 'default' }: AudioPlayerProps) {
  const { t } = useTranslation()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const isScrubbingRef = useRef(false)
  const isWarm = variant === 'warm'

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.6)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [scrubTime, setScrubTime] = useState(0)

  const displayedTime = isScrubbing ? scrubTime : currentTime

  const resetPlayback = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
    isScrubbingRef.current = false
    setIsPlaying(false)
    setIsScrubbing(false)
    setCurrentTime(0)
    setScrubTime(0)
    setDuration(0)
    setError(null)
  }, [])

  useEffect(() => {
    resetPlayback()
  }, [musicId, resetPlayback])

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
      audioRef.current?.pause()
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => {
      if (!isScrubbingRef.current) {
        setCurrentTime(audio.currentTime)
      }
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const ensureAudioLoaded = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current
    if (!audio) return false
    if (objectUrlRef.current) return true

    setIsLoading(true)
    setError(null)
    try {
      const blob = await getMusicStream(musicId)
      const url = URL.createObjectURL(blob)
      objectUrlRef.current = url
      audio.src = url
      await waitForAudioMetadata(audio)
      setDuration(audio.duration)
      return true
    } catch (err) {
      setError(err instanceof ApiError ? t('entry.player.loadError') : t('entry.error'))
      return false
    } finally {
      setIsLoading(false)
    }
  }, [musicId, t])

  async function togglePlay() {
    const audio = audioRef.current
    if (!audio || isLoading) return

    if (isPlaying) {
      audio.pause()
      return
    }

    const loaded = await ensureAudioLoaded()
    if (!loaded) return

    try {
      await audio.play()
    } catch {
      setError(t('entry.player.loadError'))
    }
  }

  async function handleSeekCommit(time: number) {
    const audio = audioRef.current
    if (!audio || isLoading) return

    const loaded = await ensureAudioLoaded()
    if (!loaded) return

    const clampedTime = Math.max(0, Math.min(time, audio.duration || time))
    audio.currentTime = clampedTime
    setCurrentTime(clampedTime)
    setScrubTime(clampedTime)

    try {
      await audio.play()
    } catch {
      setError(t('entry.player.loadError'))
    }
  }

  const transportBtnClass = isWarm
    ? 'inline-flex size-9 items-center justify-center rounded-full text-player-ink/70 transition-colors hover:bg-player-ink/10 hover:text-player-ink'
    : 'inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 hover:text-coral'

  const playBtnClass = isWarm
    ? 'inline-flex size-[4.625rem] items-center justify-center rounded-full bg-player-ink text-butter shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70'
    : 'inline-flex size-11 items-center justify-center rounded-full btn-coral-gradient text-on-primary shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-70'

  const timeClass = isWarm
    ? 'font-mono text-[11px] tabular-nums text-player-brown lg:text-xs'
    : 'font-mono text-[11px] tabular-nums text-muted lg:text-xs'

  return (
    <>
      <audio ref={audioRef} className="hidden" preload="none" />

      <div className="shrink-0 space-y-2">
        <Slider
          min={0}
          max={Math.max(duration, 1)}
          step={0.1}
          value={[displayedTime]}
          onValueChange={(value) => {
            isScrubbingRef.current = true
            setIsScrubbing(true)
            setScrubTime(value[0] ?? 0)
          }}
          onValueCommit={(value) => {
            isScrubbingRef.current = false
            setIsScrubbing(false)
            void handleSeekCommit(value[0] ?? 0)
          }}
          disabled={isLoading}
          aria-label={t('entry.player.progress')}
        />
        <div className={cn('flex justify-between', timeClass)}>
          <span>{formatDurationMmSs(displayedTime)}</span>
          <span>{formatDurationMmSs(duration)}</span>
        </div>
      </div>

      <div
        className={cn(
          'flex shrink-0 flex-col gap-3 border border-warm-border p-3 backdrop-blur-sm lg:rounded-2xl lg:p-4',
          controlsClassName,
        )}
      >
        {error ? (
          <p className="text-center text-sm font-medium text-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 lg:justify-between">
          <button
            type="button"
            aria-label={t('entry.player.shuffle')}
            className={transportBtnClass}
            disabled
          >
            <Shuffle className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t('entry.player.previous')}
            className={transportBtnClass}
            disabled
          >
            <SkipBack className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={
              isLoading
                ? t('entry.player.loading')
                : isPlaying
                  ? t('entry.player.pause')
                  : t('entry.player.play')
            }
            className={playBtnClass}
            onClick={togglePlay}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" aria-hidden />
            ) : isPlaying ? (
              <Pause className="size-6" aria-hidden />
            ) : (
              <Play className="size-6 translate-x-0.5" aria-hidden />
            )}
          </button>
          <button
            type="button"
            aria-label={t('entry.player.next')}
            className={transportBtnClass}
            disabled
          >
            <SkipForward className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t('entry.player.repeat')}
            className={transportBtnClass}
            disabled
          >
            <Repeat className="size-4" aria-hidden />
          </button>
        </div>

        {!isWarm ? (
          <div className="flex items-center justify-center gap-2 text-muted sm:justify-between">
            <Volume2 className="size-4 shrink-0 opacity-70" aria-hidden />
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={[volume]}
              onValueChange={(value) => setVolume(value[0] ?? 0)}
              aria-label={t('entry.player.volume')}
              className="min-w-0 max-w-[12rem] flex-1 lg:max-w-none"
            />
          </div>
        ) : null}
      </div>
    </>
  )
}
