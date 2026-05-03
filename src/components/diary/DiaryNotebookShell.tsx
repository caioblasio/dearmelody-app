import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type DiaryNotebookShellProps = {
  children: ReactNode
  className?: string
}

export function DiaryNotebookShell({ children, className }: DiaryNotebookShellProps) {
  return (
    <div
      className={cn(
        'diary-notebook-shell relative overflow-hidden rounded-2xl border border-outline-variant/45 bg-[#fffaf2]',
        'shadow-[4px_10px_28px_rgba(107,86,119,0.07),inset_0_1px_0_rgba(255,255,255,0.65)]',
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-[0.95rem] top-3 w-px bg-red-300/50 sm:left-[1.15rem] lg:left-5"
      />
      <div className="relative pl-6 sm:pl-7 lg:pl-10">{children}</div>
    </div>
  )
}
