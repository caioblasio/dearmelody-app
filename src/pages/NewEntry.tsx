import { WandSparkles, Music2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCreateSong } from '@/api/song/use-create-song'

const moodOptions = ['Melancholic', 'Ethereal', 'Uplifting', 'Cinematic']
const tags = ['Acoustic', 'Ethereal', 'Slow Tempo']
const entrySchema = z.object({
  reflection: z
    .string()
    .min(10, 'Write at least a few lines about your day.')
    .max(2000, 'Keep it under 2000 characters.'),
  resonance: z.enum(moodOptions),
})

type EntryFormValues = z.infer<typeof entrySchema>

export function NewEntryPage() {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      reflection: '',
      resonance: moodOptions[0],
    },
  })

  const selectedResonance = watch('resonance')
  const { mutate: createSong, isPending } = useCreateSong()

  const onSubmit = handleSubmit(async (values) => {
    createSong({
      reflection: values.reflection,
      resonance: values.resonance,
    })
  })

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Card className="space-y-6 p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-medium text-on-primary-container">
            New Entry
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-semibold text-on-surface sm:text-4xl">
            How was your day?
          </h1>
          <p className="text-on-surface-variant">
            Capture your feelings and let Melody AI turn it into your daily soundtrack.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <label className="block space-y-2">
            <div className="relative rounded-lg bg-[#fffaf2] px-4 py-2">
              <div className="pointer-events-none absolute bottom-2 left-8 top-2 w-px bg-red-300/70" />
              <textarea
                rows={9}
                placeholder="Today felt like a slow rainy afternoon with a hopeful ending..."
                className="relative w-full resize-none bg-transparent pl-8 pr-0 text-base leading-8 text-on-surface outline-none placeholder:text-on-surface-variant/70 [background-image:linear-gradient(to_bottom,transparent_31px,theme(colors.outline-variant)_32px)] [background-size:100%_32px] focus-visible:ring-0"
                aria-invalid={Boolean(errors.reflection)}
                aria-describedby={errors.reflection ? 'reflection-error' : undefined}
                {...register('reflection')}
              />
            </div>
            {errors.reflection && (
              <p id="reflection-error" className="text-sm text-error" role="alert">
                {errors.reflection.message}
              </p>
            )}
          </label>

          <div className="space-y-3">
            <p className="text-sm font-medium text-on-surface">Current Resonance</p>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => {
                const isSelected = selectedResonance === mood

                return (
                  <button
                    key={mood}
                    type="button"
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary-container text-on-primary-container'
                        : 'border-outline-variant bg-surface-container text-on-surface-variant hover:border-primary/50'
                    }`}
                    aria-pressed={isSelected}
                    onClick={() => setValue('resonance', mood, { shouldValidate: true })}
                  >
                    {mood}
                  </button>
                )
              })}
            </div>
            {errors.resonance && (
              <p className="text-sm text-error" role="alert">
                {errors.resonance.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gap-2 sm:w-auto"
            disabled={isSubmitting || isPending}
          >
            <WandSparkles className="h-4 w-4" />
            {isPending ? 'Generating...' : 'Generate My Song'}
          </Button>
        </form>
      </Card>

      <Card className="space-y-5 p-5 sm:p-7">
        <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
          <Music2 className="h-4 w-4" />
          Inspiration
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-2xl text-on-surface">Atmospheric Indie Folk</h2>
          <p className="text-sm text-on-surface-variant">
            AI will interpret your mood into a musical entry with warm textures and reflective
            melodies.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold uppercase tracking-wide text-on-secondary-container"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>
    </div>
  )
}
