import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import type { DiaryEntryDetail } from '@/api/diary/diary-entry-detail'
import { getDiaryEntry } from '@/api/diary/get-diary-entry'
import { getMusicStream } from '@/api/music/get-music-stream'
import { ApiError } from '@/lib/api-request'
import {
  PlayerContext,
  trackFromDetail,
  type PlayerContextValue,
  type PlayerTrack,
} from '@/lib/player/player-context'

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

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const isScrubbingRef = useRef(false)
  const loadedMusicIdRef = useRef<number | null>(null)

  const [track, setTrack] = useState<PlayerTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isResolving, setIsResolving] = useState(false)
  const [resolvingEntryId, setResolvingEntryId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.6)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [scrubTime, setScrubTime] = useState(0)

  const displayedTime = isScrubbing ? scrubTime : currentTime

  const revokeObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    loadedMusicIdRef.current = null
  }, [])

  const resetPlaybackTimers = useCallback(() => {
    isScrubbingRef.current = false
    setIsScrubbing(false)
    setCurrentTime(0)
    setScrubTime(0)
    setDuration(0)
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    const audio = document.createElement('audio')
    audio.preload = 'none'
    audio.volume = 0.6
    audioRef.current = audio

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => {
      if (!isScrubbingRef.current) {
        setCurrentTime(audio.currentTime)
      }
    }
    const onLoadedMetadata = () => setDuration(audio.duration || 0)
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
      audio.pause()
      revokeObjectUrl()
      audioRef.current = null
    }
  }, [revokeObjectUrl])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const ensureAudioLoaded = useCallback(
    async (musicId: number): Promise<boolean> => {
      const audio = audioRef.current
      if (!audio) return false
      if (objectUrlRef.current && loadedMusicIdRef.current === musicId) return true

      setIsLoading(true)
      setError(null)
      try {
        revokeObjectUrl()
        const blob = await getMusicStream(musicId)
        const url = URL.createObjectURL(blob)
        objectUrlRef.current = url
        loadedMusicIdRef.current = musicId
        audio.src = url
        await waitForAudioMetadata(audio)
        setDuration(audio.duration || 0)
        return true
      } catch (err) {
        setError(err instanceof ApiError ? t('entry.player.loadError') : t('entry.error'))
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [revokeObjectUrl, t],
  )

  const startTrack = useCallback(
    async (next: PlayerTrack) => {
      const audio = audioRef.current
      if (!audio) return

      const isSameTrack = track?.musicId === next.musicId && track?.entryId === next.entryId

      setTrack(next)
      setError(null)

      if (isSameTrack) {
        if (audio.paused) {
          try {
            await audio.play()
          } catch {
            setError(t('entry.player.loadError'))
          }
        }
        return
      }

      audio.pause()
      revokeObjectUrl()
      resetPlaybackTimers()
      audio.removeAttribute('src')
      audio.load()

      const loaded = await ensureAudioLoaded(next.musicId)
      if (!loaded) return

      try {
        await audio.play()
      } catch {
        setError(t('entry.player.loadError'))
      }
    },
    [ensureAudioLoaded, resetPlaybackTimers, revokeObjectUrl, t, track?.entryId, track?.musicId],
  )

  const playFromDetail = useCallback(
    async (detail: DiaryEntryDetail) => {
      const next = trackFromDetail(detail)
      if (!next) {
        setError(t('entry.player.loadError'))
        return
      }
      await startTrack(next)
    },
    [startTrack, t],
  )

  const playEntry = useCallback(
    async (entryId: string) => {
      if (track?.entryId === entryId) {
        await startTrack(track)
        return
      }

      setIsResolving(true)
      setResolvingEntryId(entryId)
      setError(null)
      try {
        const detail = await queryClient.fetchQuery({
          queryKey: ['diary', 'entry', entryId],
          queryFn: () => getDiaryEntry(entryId),
        })
        await playFromDetail(detail)
      } catch (err) {
        setError(err instanceof ApiError ? t('entry.player.loadError') : t('entry.error'))
      } finally {
        setIsResolving(false)
        setResolvingEntryId(null)
      }
    },
    [playFromDetail, queryClient, startTrack, t, track],
  )

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !track || isLoading) return

    if (isPlaying) {
      audio.pause()
      return
    }

    const loaded = await ensureAudioLoaded(track.musicId)
    if (!loaded) return

    try {
      await audio.play()
    } catch {
      setError(t('entry.player.loadError'))
    }
  }, [ensureAudioLoaded, isLoading, isPlaying, t, track])

  const beginScrub = useCallback((time: number) => {
    isScrubbingRef.current = true
    setIsScrubbing(true)
    setScrubTime(time)
  }, [])

  const seek = useCallback(
    async (time: number) => {
      const audio = audioRef.current
      if (!audio || !track || isLoading) return

      isScrubbingRef.current = false
      setIsScrubbing(false)

      const loaded = await ensureAudioLoaded(track.musicId)
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
    },
    [ensureAudioLoaded, isLoading, t, track],
  )

  const setVolume = useCallback((next: number) => {
    setVolumeState(next)
  }, [])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
    revokeObjectUrl()
    resetPlaybackTimers()
    setTrack(null)
    setError(null)
  }, [resetPlaybackTimers, revokeObjectUrl])

  const isCurrentEntry = useCallback((entryId: string) => track?.entryId === entryId, [track])

  const value = useMemo<PlayerContextValue>(
    () => ({
      track,
      isPlaying,
      isLoading,
      isResolving,
      resolvingEntryId,
      error,
      currentTime,
      duration,
      volume,
      isScrubbing,
      scrubTime,
      displayedTime,
      playEntry,
      playFromDetail,
      togglePlay,
      seek,
      beginScrub,
      setVolume,
      stop,
      isCurrentEntry,
    }),
    [
      track,
      isPlaying,
      isLoading,
      isResolving,
      resolvingEntryId,
      error,
      currentTime,
      duration,
      volume,
      isScrubbing,
      scrubTime,
      displayedTime,
      playEntry,
      playFromDetail,
      togglePlay,
      seek,
      beginScrub,
      setVolume,
      stop,
      isCurrentEntry,
    ],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
