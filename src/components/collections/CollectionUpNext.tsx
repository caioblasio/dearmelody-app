import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type CollectionUpNextItem = {
  id: string
  title: string
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
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="w-full truncate rounded-lg px-2 py-2 text-left text-sm font-medium text-player-ink/80 transition-colors hover:bg-player-ink/10 hover:text-player-ink"
              onClick={() => onSelect(item.id)}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
