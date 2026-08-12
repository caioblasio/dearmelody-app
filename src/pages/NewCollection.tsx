import { ChevronLeft } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useAddCollectionDiary } from '@/api/collections/use-add-collection-diary'
import { useCreateCollection } from '@/api/collections/use-create-collection'
import { CollectionCard } from '@/components/collections/CollectionCard'
import { CollectionEntryPicker } from '@/components/collections/CollectionEntryPicker'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { collectionPath, type CollectionCardData } from '@/lib/collections'

const PREVIEW_COLLECTION_ID = -1

export function NewCollectionPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [previewDescription, setPreviewDescription] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)

  const createCollection = useCreateCollection()
  const addCollectionDiary = useAddCollectionDiary()

  const isSubmitting = createCollection.isPending || addCollectionDiary.isPending
  const trimmedTitle = title.trim()

  const syncPreview = () => {
    setPreviewTitle(title)
    setPreviewDescription(description)
  }

  const handleToggleEntry = useCallback((id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((entryId) => entryId !== id) : [...current, id],
    )
  }, [])

  const previewCollection: CollectionCardData = {
    id: PREVIEW_COLLECTION_ID,
    title: previewTitle.trim() || t('collections.untitledPreview'),
    description: previewDescription.trim() || null,
    imageLocation: null,
    entryCount: selectedIds.length,
  }

  async function handleCreate() {
    if (!trimmedTitle || isSubmitting) return

    setSubmitError(null)

    try {
      const { id } = await createCollection.mutateAsync({
        title: trimmedTitle,
        ...(description.trim() ? { description: description.trim() } : {}),
      })

      if (selectedIds.length > 0) {
        await addCollectionDiary.mutateAsync({ id, diaryIds: selectedIds })
      }

      navigate(collectionPath(id))
    } catch {
      setSubmitError(t('collections.createError'))
    }
  }

  return (
    <section className="space-y-8">
      <div>
        <Link
          to="/collections"
          aria-label={t('collections.backAria')}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-coral transition-colors hover:text-coral-light"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          {t('collections.backToCollections')}
        </Link>

        <header className="space-y-2">
          <h1 className="font-heading text-[2.125rem] font-semibold text-ink sm:text-4xl">
            {t('collections.newTitle')}
          </h1>
          <p className="text-muted">{t('collections.newSubtitle')}</p>
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

      <div className="flex justify-end border-t border-warm-border pt-6">
        <Button
          type="button"
          onClick={() => void handleCreate()}
          disabled={!trimmedTitle || isSubmitting}
          className="min-w-[10rem] rounded-full"
        >
          {isSubmitting ? t('collections.createPending') : t('collections.createCollection')}
        </Button>
      </div>
    </section>
  )
}
