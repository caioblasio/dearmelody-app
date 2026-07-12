import * as React from 'react'

import { cn } from '../../lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'rounded-[20px] border border-warm-border bg-card-bg p-6 shadow-sm sm:p-8',
        className
      )}
      {...props}
    />
  )
}

export { Card }
