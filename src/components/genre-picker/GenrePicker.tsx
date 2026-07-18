import { useMemo, useState } from 'react'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { GENRES, findGenreBySubgenreLabel } from '@/constants/genres'
import { cn } from '@/lib/utils'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type GenrePickerProps = {
  value?: string
  onChange: (subgenreLabel: string) => void
  error?: boolean
}

type Step = 'genre' | 'subgenre'

function GenrePickerPanel({
  step,
  activeGenreId,
  value,
  onSelectGenre,
  onSelectSubgenre,
  onBack,
}: {
  step: Step
  activeGenreId: string | null
  value?: string
  onSelectGenre: (genreId: string) => void
  onSelectSubgenre: (label: string) => void
  onBack: () => void
}) {
  const { t } = useTranslation()
  const activeGenre = GENRES.find((genre) => genre.id === activeGenreId)

  if (step === 'subgenre' && activeGenre) {
    return (
      <div className="flex min-h-0 flex-col gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-chip-bg/60 hover:text-ink"
            aria-label={t('newEntry.genrePicker.back')}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-sand">
              {t('newEntry.genrePicker.chooseSubgenreTitle')}
            </p>
            <p className="truncate text-sm font-semibold text-ink">{activeGenre.label}</p>
          </div>
        </div>

        <RadioGroup
          value={value ?? ''}
          onValueChange={onSelectSubgenre}
          className="max-h-64 gap-1 overflow-y-auto pr-1"
        >
          {activeGenre.subgenres.map((subgenre) => {
            const isSelected = value === subgenre.label
            return (
              <label
                key={subgenre.id}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-chip-bg text-coral'
                    : 'text-ink hover:bg-chip-bg/60',
                )}
              >
                <RadioGroupItem value={subgenre.label} />
                <span>{subgenre.label}</span>
              </label>
            )
          })}
        </RadioGroup>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-wide text-sand">
        {t('newEntry.genrePicker.chooseGenreTitle')}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {GENRES.map((genre) => {
          const isActive = activeGenreId === genre.id
          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => onSelectGenre(genre.id)}
              className={cn(
                'rounded-2xl border px-3 py-2.5 text-left text-[13px] font-semibold transition-colors',
                isActive
                  ? 'border-coral bg-chip-bg text-coral'
                  : 'border-warm-border text-muted hover:border-peach hover:text-ink',
              )}
            >
              {genre.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function GenrePicker({ value, onChange, error }: GenrePickerProps) {
  const { t } = useTranslation()
  const [desktopOpen, setDesktopOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [step, setStep] = useState<Step>('genre')
  const [activeGenreId, setActiveGenreId] = useState<string | null>(null)

  const selectedGenre = useMemo(
    () => (value ? findGenreBySubgenreLabel(value) : undefined),
    [value],
  )

  const syncOpenState = (setOpen: (open: boolean) => void) => (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (nextOpen) {
      if (value) {
        const parent = findGenreBySubgenreLabel(value)
        setActiveGenreId(parent?.id ?? null)
        setStep(parent ? 'subgenre' : 'genre')
      } else {
        setActiveGenreId(null)
        setStep('genre')
      }
    }
  }

  const handleSelectGenre = (genreId: string) => {
    setActiveGenreId(genreId)
    setStep('subgenre')
  }

  const handleSelectSubgenre = (label: string) => {
    onChange(label)
    setDesktopOpen(false)
    setMobileOpen(false)
  }

  const handleBack = () => {
    setStep('genre')
  }

  const renderTriggerLabel = () =>
    value ? (
      <span className="flex min-w-0 items-baseline gap-1.5">
        {selectedGenre && (
          <span className="shrink-0 text-xs font-medium text-muted">{selectedGenre.label}</span>
        )}
        <span className="truncate font-semibold text-coral">{value}</span>
      </span>
    ) : (
      <span className="font-semibold text-muted">{t('newEntry.genrePicker.placeholder')}</span>
    )

  const triggerClassName = cn(
    'inline-flex max-w-full items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors',
    value
      ? 'border-transparent bg-chip-bg'
      : 'border-warm-border text-muted hover:border-peach',
    error && 'border-error',
  )

  const panelProps = {
    step,
    activeGenreId,
    value,
    onSelectGenre: handleSelectGenre,
    onSelectSubgenre: handleSelectSubgenre,
    onBack: handleBack,
  }

  return (
    <>
      <div className="md:hidden">
        <Drawer open={mobileOpen} onOpenChange={syncOpenState(setMobileOpen)}>
          <DrawerTrigger asChild>
            <button type="button" aria-invalid={error || undefined} className={triggerClassName}>
              {renderTriggerLabel()}
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="px-4 pb-6 pt-2">
              <DrawerTitle className="sr-only">
                {step === 'subgenre'
                  ? t('newEntry.genrePicker.chooseSubgenreTitle')
                  : t('newEntry.genrePicker.chooseGenreTitle')}
              </DrawerTitle>
              <GenrePickerPanel {...panelProps} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <Popover open={desktopOpen} onOpenChange={syncOpenState(setDesktopOpen)}>
          <PopoverTrigger asChild>
            <button type="button" aria-invalid={error || undefined} className={triggerClassName}>
              {renderTriggerLabel()}
              <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[28rem] p-4">
            <GenrePickerPanel {...panelProps} />
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
