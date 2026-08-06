import { ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

type EntrySnippetBarProps = {
  entryText: string
  entryTitle?: string
  className?: string
}

function excerpt(text: string, max = 72): string {
  const trimmed = text.trim().replace(/\s+/g, ' ')
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max).trimEnd()}…`
}

export function EntrySnippetBar({ entryText, entryTitle, className }: EntrySnippetBarProps) {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const preview = excerpt(entryText)
  if (!entryText.trim()) return null

  return (
    <>
      {/* Desktop: native details / summary */}
      <details
        className={cn(
          'group hidden rounded-2xl bg-card-bg/70 px-4 py-3 backdrop-blur-sm lg:block',
          className
        )}
      >
        <summary className="flex cursor-pointer list-none items-stretch gap-3 text-left [&::-webkit-details-marker]:hidden">
          <span className="w-1 shrink-0 self-stretch rounded-full bg-coral" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-player-ink">
              {t('entry.snippet.fromEntry')}
            </span>
            <span className="mt-0.5 block truncate text-sm italic text-player-brown group-open:hidden">
              “{preview}”
            </span>
          </span>
          <span className="shrink-0 self-center text-sm font-semibold text-coral">
            <span className="group-open:hidden">{t('entry.snippet.readEntry')}</span>
            <span className="hidden group-open:inline">{t('entry.snippet.hideEntry')}</span>
          </span>
        </summary>
        <p className="mt-3 whitespace-pre-wrap pl-4 text-base leading-relaxed text-player-ink">
          {entryText.trim()}
        </p>
      </details>

      {/* Mobile: opens drawer */}
      <div className={cn('lg:hidden', className)}>
        <button
          type="button"
          className="flex w-full items-stretch gap-3 rounded-2xl bg-card-bg/80 px-4 py-3 text-left shadow-sm backdrop-blur-sm"
          onClick={() => setMobileOpen(true)}
        >
          <span className="w-1 shrink-0 self-stretch rounded-full bg-coral" aria-hidden />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-player-ink">
              {t('entry.snippet.readBehind')}
            </span>
            <span className="mt-0.5 block truncate text-sm italic text-player-brown">
              “{preview}”
            </span>
          </span>
          <ChevronRight className="size-5 shrink-0 self-center text-player-ink/50" aria-hidden />
        </button>

        <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
          <DrawerContent>
            <div className="px-4 pb-6 pt-2">
              <DrawerHeader className="px-0 text-left">
                <DrawerTitle>{entryTitle || t('entry.originalEntry')}</DrawerTitle>
                <DrawerDescription className="sr-only">
                  {t('entry.snippet.drawerDescription')}
                </DrawerDescription>
              </DrawerHeader>
              <p className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-base leading-relaxed text-body">
                {entryText.trim()}
              </p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}
