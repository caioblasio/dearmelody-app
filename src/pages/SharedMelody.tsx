import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useGetMusicShare } from '@/api/music/use-get-music-share'
import { useUserInfo } from '@/api/user/use-user-info'
import { PlayerHero } from '@/components/player/PlayerHero'
import { ShareMoodGenreStrip } from '@/components/share/ShareMoodGenreStrip'
import { ShareSignupBanner } from '@/components/share/ShareSignupBanner'
import { Alert } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { ApiError } from '@/lib/api-request'
import { getToken } from '@/lib/auth'
import { trackFromShare } from '@/lib/player/player-context'
import { usePlayer } from '@/lib/player/use-player'
import { AUTH_SHELL_CLASS } from '@/lib/auth-shell'
import { cn } from '@/lib/utils'

function SharedMelodySkeleton() {
  const { t } = useTranslation()

  return (
    <div
      className="player-gradient relative flex flex-col px-5 pb-8 pt-4 sm:px-8 lg:rounded-[28px] lg:px-12 lg:py-12"
      aria-busy="true"
      aria-live="polite"
      aria-label={t('shareMelody.loading')}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-11">
        <div className="mx-auto w-full max-w-[400px] shrink-0 lg:mx-0">
          <Skeleton className="aspect-square w-full rounded-[24px] bg-player-ink/15" />
        </div>
        <div className="min-w-0 flex-1 space-y-5">
          <Skeleton className="h-3 w-56 bg-player-ink/15" />
          <Skeleton className="h-12 w-3/4 max-w-lg bg-player-ink/20" />
          <div className="space-y-3">
            <Skeleton className="h-1 w-full bg-player-ink/20" />
            <Skeleton className="size-14 rounded-full bg-player-ink/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function SharedMelodyPage() {
  const { shareToken } = useParams<{ shareToken: string }>()
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useGetMusicShare(shareToken)
  const { playFromShare } = usePlayer()
  const hasToken = Boolean(getToken())
  const { data: user } = useUserInfo()
  const isAuthed = hasToken && Boolean(user)

  if (isLoading) {
    return <SharedMelodySkeleton />
  }

  if (isError || !data || !shareToken) {
    const notFound = error instanceof ApiError && error.status === 404
    return (
      <div className={cn(AUTH_SHELL_CLASS, 'py-10')}>
        <Alert variant="destructive">
          {notFound ? t('shareMelody.notFound') : t('shareMelody.error')}
        </Alert>
      </div>
    )
  }

  const track = trackFromShare(data, shareToken)
  const tryNowHref = isAuthed ? '/new-entry' : '/signup'

  return (
    <div className="space-y-8 lg:space-y-10">
      <PlayerHero
        track={track}
        lyricsMode="flip"
        fillViewport={false}
        eyebrow={t('shareMelody.attribution', { firstName: data.firstName })}
        onActivate={() => playFromShare(data, shareToken)}
      />

      <div className="space-y-10 px-5 pb-16 lg:px-0">
        {!isAuthed ? <ShareSignupBanner firstName={data.firstName} /> : null}
        <ShareMoodGenreStrip tryNowHref={tryNowHref} />
      </div>
    </div>
  )
}
