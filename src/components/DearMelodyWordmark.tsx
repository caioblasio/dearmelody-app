import { cn } from '@/lib/utils'

type DearMelodyWordmarkProps = {
  className?: string
}

export function DearMelodyWordmark({ className }: DearMelodyWordmarkProps) {
  return (
    <span className={cn('text-ink', className)}>
      Dear<span className="text-coral">Melody</span>
    </span>
  )
}
