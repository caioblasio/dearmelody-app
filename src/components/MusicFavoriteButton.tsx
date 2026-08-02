import { Heart } from 'lucide-react'
import type { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { useToggleMusicFavorite } from '@/api/music/use-toggle-music-favorite'
import { cn } from '@/lib/utils'

type MusicFavoriteButtonProps = {
  musicId: number
  isFavorited: boolean
  /** `hero` matches the entry player header; `row` is compact for list cards. */
  variant?: 'hero' | 'row'
  className?: string
}

export function MusicFavoriteButton({
  musicId,
  isFavorited,
  variant = 'hero',
  className,
}: MusicFavoriteButtonProps) {
  const { t } = useTranslation()
  const { mutate, isPending } = useToggleMusicFavorite()

  function handleClick(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (isPending) return
    mutate({ musicId, isFavorited: !isFavorited })
  }

  return (
    <button
      type="button"
      aria-pressed={isFavorited}
      aria-label={isFavorited ? t('entry.unfavorite') : t('entry.favorite')}
      disabled={isPending}
      className={cn(
        'rounded-full border border-warm-border/60 bg-card-bg/70 text-muted transition-colors hover:text-plum',
        'outline-none focus-visible:ring-2 focus-visible:ring-coral/35 disabled:opacity-60',
        isFavorited && 'text-plum',
        variant === 'hero' ? 'p-1.5' : 'p-1',
        className,
      )}
      onClick={handleClick}
    >
      <Heart
        className={cn(
          variant === 'hero' ? 'size-3.5 lg:size-4' : 'size-4',
          isFavorited && 'fill-plum/60',
        )}
        aria-hidden
      />
    </button>
  )
}
