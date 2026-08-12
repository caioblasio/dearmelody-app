import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type CollectionUpNextItem = {
  id: string
  title: string
  entryTitle: string
  imageLocation: string | null
}

type CollectionUpNextProps = {
  items: CollectionUpNextItem[]
  onSelect: (id: string) => void
  className?: string
}

export function CollectionUpNext({ items, onSelect, className }: CollectionUpNextProps) {
  const { t } = useTranslation()

  if (items.length === 0) return null

  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="label-caps text-player-brown">{t('collections.upNext')}</h2>
      <ul className="space-y-0.5" aria-label={t('collections.upNextAria')}>
        {items.map((item) => {
          const showEntryTitle = item.entryTitle && item.entryTitle !== item.title

          return (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-player-ink/10"
                onClick={() => onSelect(item.id)}
              >
                {item.imageLocation ? (
                  <img
                    src={item.imageLocation}
                    alt=""
                    className="size-10 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="album-art-gradient flex size-10 shrink-0 items-center justify-center rounded-lg text-sm text-on-primary/90">
                    ♪
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-player-ink">{item.title}</p>
                  {showEntryTitle ? (
                    <p className="truncate text-xs text-player-brown">{item.entryTitle}</p>
                  ) : null}
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
