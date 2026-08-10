import { Check, Copy, Share2 } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useShareMusic } from '@/api/music/use-share-music'
import { useUserInfo } from '@/api/user/use-user-info'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type MusicShareButtonProps = {
  musicId: number
  shareToken: string | null
  title: string
  disabled?: boolean
  className?: string
}

function shareUrlForToken(token: string): string {
  return `${window.location.origin}/melodies/share/${token}`
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}

export function MusicShareButton({
  musicId,
  shareToken,
  title,
  disabled = false,
  className,
}: MusicShareButtonProps) {
  const { t } = useTranslation()
  const { mutateAsync, isPending } = useShareMusic()
  const { data: user } = useUserInfo()

  const [open, setOpen] = useState(false)
  const [link, setLink] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const displayLink = link ?? (shareToken ? shareUrlForToken(shareToken) : null)

  async function resolveShareUrl(): Promise<string> {
    if (shareToken) {
      const url = shareUrlForToken(shareToken)
      setLink(url)
      return url
    }
    const { shareToken: token } = await mutateAsync(musicId)
    const url = shareUrlForToken(token)
    setLink(url)
    return url
  }

  async function tryNativeShare(url: string): Promise<boolean> {
    if (typeof navigator.share !== 'function') return false
    try {
      await navigator.share({
        title,
        text: t('entry.shareMessage', { first_name: user?.first_name ?? '' }),
        url,
      })
      return true
    } catch (err) {
      if (isAbortError(err)) return true
      return false
    }
  }

  async function onShareClick() {
    if (disabled || isPending) return
    setError(null)
    setCopied(false)

    try {
      const url = await resolveShareUrl()
      const shared = await tryNativeShare(url)
      if (!shared) {
        setOpen(true)
      }
    } catch {
      setError(t('entry.shareError'))
      setOpen(true)
    }
  }

  async function onCopy() {
    if (!displayLink || !navigator.clipboard?.writeText) return
    try {
      await navigator.clipboard.writeText(displayLink)
      setCopied(true)
    } catch {
      /* clipboard denied */
    }
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) {
          setCopied(false)
          setError(null)
        }
      }}
    >
      <PopoverAnchor asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className={cn('gap-2 border-player-ink/30 bg-card-bg/50 text-player-ink', className)}
          disabled={disabled || isPending}
          onClick={() => void onShareClick()}
        >
          <Share2 className="size-4" aria-hidden />
          <span className="hidden sm:inline">
            {isPending ? t('entry.sharing') : t('entry.share')}
          </span>
        </Button>
      </PopoverAnchor>
      <PopoverContent align="end" className="w-[min(22rem,calc(100vw-2rem))] space-y-3">
        <p className="text-sm font-medium text-ink">{t('entry.shareLink')}</p>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {displayLink ? (
          <div className="flex gap-2">
            <Input
              readOnly
              value={displayLink}
              aria-label={t('entry.shareLink')}
              className="h-10 truncate rounded-xl text-xs"
              onFocus={(e) => e.target.select()}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={() => void onCopy()}
            >
              {copied ? (
                <Check className="size-4" aria-hidden />
              ) : (
                <Copy className="size-4" aria-hidden />
              )}
              <span>{copied ? t('entry.copied') : t('entry.copyLink')}</span>
            </Button>
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  )
}
