import { Check, FolderCheck, FolderPlus, Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import type { CollectionSummary } from '@/api/collections/collection-summary'
import { useGetCollections } from '@/api/collections/use-get-collections'
import { useGetDiaryEntryCollections } from '@/api/collections/use-get-diary-entry-collections'
import { useToggleEntryCollection } from '@/api/collections/use-toggle-entry-collection'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

type AddToCollectionButtonProps = {
  diaryId: string
  disabled?: boolean
  className?: string
}

const COLLECTIONS_LIMIT = 100

const triggerButtonClassName =
  'gap-2 border-player-ink/30 bg-card-bg/50 text-player-ink'

function AddToCollectionPanel({
  diaryId,
  collections,
  memberIds,
  isLoading,
  isError,
  density,
}: {
  diaryId: string
  collections: CollectionSummary[]
  memberIds: Set<number>
  isLoading: boolean
  isError: boolean
  density: 'compact' | 'comfortable'
}) {
  const { t } = useTranslation()
  const toggle = useToggleEntryCollection()

  function onToggle(collection: CollectionSummary, nextMember: boolean) {
    toggle.mutate({
      diaryId,
      collection,
      isMember: nextMember,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted">
        <Loader2 className="size-4 animate-spin" aria-hidden />
        {t('common.loading')}
      </div>
    )
  }

  if (isError) {
    return (
      <p className="px-3 py-6 text-center text-sm text-error" role="alert">
        {t('entry.addToCollectionError')}
      </p>
    )
  }

  if (collections.length === 0) {
    return (
      <div className="space-y-3 px-3 py-6 text-center">
        <p className="text-sm text-muted">{t('entry.addToCollectionEmpty')}</p>
        <Link
          to="/collections/new"
          className="inline-flex text-sm font-semibold text-coral transition-colors hover:text-coral-light"
        >
          {t('collections.newCollection')}
        </Link>
      </div>
    )
  }

  if (density === 'compact') {
    return (
      <div className="max-h-64 overflow-y-auto py-1">
        {collections.map((collection) => {
          const checked = memberIds.has(collection.id)
          return (
            <DropdownMenuCheckboxItem
              key={collection.id}
              checked={checked}
              onCheckedChange={(value) => onToggle(collection, value === true)}
              onSelect={(event) => event.preventDefault()}
              className="rounded-xl"
            >
              <span className="min-w-0 truncate">{collection.title}</span>
            </DropdownMenuCheckboxItem>
          )
        })}
      </div>
    )
  }

  return (
    <ul className="max-h-[50vh] space-y-1 overflow-y-auto px-1 pb-2">
      {collections.map((collection) => {
        const checked = memberIds.has(collection.id)
        return (
          <li key={collection.id}>
            <button
              type="button"
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors',
                checked
                  ? 'bg-chip-bg text-coral'
                  : 'text-ink hover:bg-chip-bg/60',
              )}
              onClick={() => onToggle(collection, !checked)}
              aria-pressed={checked}
              aria-label={
                checked
                  ? t('entry.removeFromCollectionAria', { title: collection.title })
                  : t('entry.addToCollectionAria', { title: collection.title })
              }
            >
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-md border',
                  checked
                    ? 'border-coral bg-coral text-white'
                    : 'border-warm-border bg-card-bg',
                )}
                aria-hidden
              >
                {checked ? <Check className="size-3.5" /> : null}
              </span>
              <span className="min-w-0 flex-1 truncate">{collection.title}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export function AddToCollectionButton({
  diaryId,
  disabled = false,
  className,
}: AddToCollectionButtonProps) {
  const { t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)

  const open = mobileOpen || desktopOpen
  const fetchEnabled = hasOpened || open

  const collectionsQuery = useGetCollections({ limit: COLLECTIONS_LIMIT }, fetchEnabled)
  const membershipQuery = useGetDiaryEntryCollections(
    diaryId,
    { limit: COLLECTIONS_LIMIT },
    fetchEnabled,
  )

  const collections = collectionsQuery.data ?? []
  const memberIds = useMemo(
    () => new Set((membershipQuery.data ?? []).map((item) => item.id)),
    [membershipQuery.data],
  )
  const isInAnyCollection = memberIds.size > 0

  const isLoading =
    fetchEnabled &&
    ((collectionsQuery.isLoading && !collectionsQuery.data) ||
      (membershipQuery.isLoading && !membershipQuery.data))
  const isError = fetchEnabled && (collectionsQuery.isError || membershipQuery.isError)

  const label = isInAnyCollection
    ? t('entry.addedToCollection')
    : t('entry.addToCollection')
  const Icon = isInAnyCollection ? FolderCheck : FolderPlus

  function syncOpen(setter: (open: boolean) => void) {
    return (next: boolean) => {
      if (next) setHasOpened(true)
      setter(next)
    }
  }

  const panelProps = {
    diaryId,
    collections,
    memberIds,
    isLoading,
    isError,
  }

  const triggerClassName = cn(triggerButtonClassName, className)

  return (
    <>
      <div className="md:hidden">
        <Drawer open={mobileOpen} onOpenChange={syncOpen(setMobileOpen)}>
          <DrawerTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={triggerClassName}
              disabled={disabled}
              aria-label={label}
            >
              <Icon className="size-4" aria-hidden />
              <span className="hidden sm:inline-flex min-w-0 max-w-[9rem] truncate">
                {label}
              </span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="pb-2 text-left">
              <DrawerTitle>{t('entry.addToCollectionTitle')}</DrawerTitle>
            </DrawerHeader>
            <div className="px-3 pb-6">
              <AddToCollectionPanel {...panelProps} density="comfortable" />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <DropdownMenu open={desktopOpen} onOpenChange={syncOpen(setDesktopOpen)}>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={triggerClassName}
              disabled={disabled}
              aria-label={label}
            >
              <Icon className="size-4" aria-hidden />
              <span className="hidden sm:inline-flex min-w-0 max-w-[9rem] truncate">
                {label}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-1">
            <DropdownMenuLabel className="px-3 font-heading text-sm text-ink">
              {t('entry.addToCollectionTitle')}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AddToCollectionPanel {...panelProps} density="compact" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
