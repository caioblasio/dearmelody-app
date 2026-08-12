import { ChevronLeft } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAddCollectionDiary } from '@/api/collections/use-add-collection-diary'
import { useDeleteCollection } from '@/api/collections/use-delete-collection'
import { useGetCollection } from '@/api/collections/use-get-collection'
import { useRemoveCollectionDiary } from '@/api/collections/use-remove-collection-diary'
import { useUpdateCollection } from '@/api/collections/use-update-collection'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { CollectionEntryPicker } from '@/components/collections/CollectionEntryPicker'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { ApiError } from '@/lib/api-request'
import {
  collectionPath,
  isFavoritesCollectionId,
  type CollectionCardData,
} from '@/lib/collections'

export function EditCollectionPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const isFavorites = isFavoritesCollectionId(id)
  const numericId = !isFavorites && id != null && /^\d+$/.test(id) ? Number(id) : undefined

  const collectionQuery = useGetCollection(numericId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewDescription, setPreviewDescription] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [initialSelectedIds, setInitialSelectedIds] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const updateCollection = useUpdateCollection()
  const addCollectionDiary = useAddCollectionDiary()
  const removeCollectionDiary = useRemoveCollectionDiary()
  const deleteCollection = useDeleteCollection()

  const isBusy =
    updateCollection.isPending ||
    addCollectionDiary.isPending ||
    removeCollectionDiary.isPending ||
    deleteCollection.isPending
  const trimmedTitle = title.trim()

  useEffect(() => {
    setHydrated(false)
  }, [numericId])

  useEffect(() => {
    if (!collectionQuery.data || hydrated) return

    const { title: nextTitle, description: nextDescription, diaryEntries } = collectionQuery.data
    const entryIds = diaryEntries.map((entry) => entry.id)

    setTitle(nextTitle)
    setDescription(nextDescription ?? '')
    setPreviewTitle(nextTitle)
    setPreviewDescription(nextDescription ?? '')
    setSelectedIds(entryIds)
    setInitialSelectedIds(entryIds)
    setHydrated(true)
  }, [collectionQuery.data, hydrated])

  const syncPreview = () => {
    setPreviewTitle(title)
    setPreviewDescription(description)
  }

  const handleToggleEntry = useCallback((entryId: string) => {
    setSelectedIds((current) =>
      current.includes(entryId)
        ? current.filter((idValue) => idValue !== entryId)
        : [...current, entryId],
    )
  }, [])

  const previewCollection: CollectionCardData = {
    id: numericId ?? -1,
    title: previewTitle.trim() || t('collections.untitledPreview'),
    description: previewDescription.trim() || null,
    imageLocation: collectionQuery.data?.imageLocation ?? null,
    entryCount: selectedIds.length,
  }

  async function handleSave() {
    if (numericId == null || !trimmedTitle || isBusy) return

    setSubmitError(null)

    const initialSet = new Set(initialSelectedIds)
    const selectedSet = new Set(selectedIds)
    const toAdd = selectedIds.filter((entryId) => !initialSet.has(entryId))
    const toRemove = initialSelectedIds.filter((entryId) => !selectedSet.has(entryId))

    try {
      await updateCollection.mutateAsync({
        id: numericId,
        payload: {
          title: trimmedTitle,
          ...(description.trim() ? { description: description.trim() } : {}),
        },
      })

      if (toAdd.length > 0) {
        await addCollectionDiary.mutateAsync({ id: numericId, diaryIds: toAdd })
      }

      if (toRemove.length > 0) {
        await Promise.all(
          toRemove.map((diaryId) =>
            removeCollectionDiary.mutateAsync({ id: numericId, diaryId }),
          ),
        )
      }

      navigate(collectionPath(numericId))
    } catch {
      setSubmitError(t('collections.saveError'))
    }
  }

  async function handleDelete() {
    if (numericId == null || isBusy) return
    if (!window.confirm(t('collections.deleteConfirm'))) return

    setSubmitError(null)

    try {
      await deleteCollection.mutateAsync(numericId)
      navigate('/collections')
    } catch {
      setSubmitError(t('collections.deleteError'))
    }
  }

  if (isFavorites || id == null || numericId == null) {
    return (
      <p className="text-sm text-muted" role="status">
        {t('collections.detailNotFound')}
      </p>
    )
  }

  if (collectionQuery.isLoading || (collectionQuery.isSuccess && !hydrated)) {
    return (
      <section className="space-y-8" aria-busy="true" aria-label={t('collections.detailLoading')}>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-64 max-w-full" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
          <Skeleton className="aspect-[4/3] w-full rounded-[20px]" />
        </div>
      </section>
    )
  }

  if (
    collectionQuery.isError &&
    collectionQuery.error instanceof ApiError &&
    collectionQuery.error.status === 404
  ) {
    return (
      <p className="text-sm text-muted" role="status">
        {t('collections.detailNotFound')}
      </p>
    )
  }

  if (collectionQuery.isError) {
    return <Alert variant="destructive">{t('collections.detailLoadError')}</Alert>
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          to={collectionPath(numericId)}
          aria-label={t('collections.backToCollectionAria')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          {t('collections.backToCollection')}
        </Link>

        <header className="space-y-2">
          <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
            {t('collections.editTitle')}
          </h1>
          <p className="text-muted">{t('collections.editSubtitle')}</p>
        </header>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-3">
          <h2 className="label-caps text-sand">{t('collections.informationSection')}</h2>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="collection-title" className="text-[13px] font-semibold text-body">
                {t('collections.titleLabel')}
              </Label>
              <Input
                id="collection-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={syncPreview}
                placeholder={t('collections.titlePlaceholder')}
                className="rounded-[14px]"
                autoComplete="off"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="collection-description"
                className="text-[13px] font-semibold text-body"
              >
                {t('collections.descriptionLabel')}
              </Label>
              <Textarea
                id="collection-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={syncPreview}
                placeholder={t('collections.descriptionPlaceholder')}
                className="rounded-[14px]"
                rows={4}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-4 lg:self-start">
          <p className="label-caps text-sand">{t('collections.previewLabel')}</p>
          <CollectionCard collection={previewCollection} interactive={false} />
        </aside>
      </div>

      <CollectionEntryPicker selectedIds={selectedIds} onToggle={handleToggleEntry} />

      {submitError ? <Alert variant="destructive">{submitError}</Alert> : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-warm-border pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => void handleDelete()}
          disabled={isBusy}
          className="min-w-[10rem] rounded-full border-error text-error hover:bg-error/10"
        >
          {deleteCollection.isPending
            ? t('collections.deletePending')
            : t('collections.deleteCollection')}
        </Button>

        <Button
          type="button"
          onClick={() => void handleSave()}
          disabled={!trimmedTitle || isBusy}
          className="min-w-[10rem] rounded-full"
        >
          {isBusy && !deleteCollection.isPending
            ? t('collections.savePending')
            : t('collections.saveCollection')}
        </Button>
      </div>
    </section>
  )
}
