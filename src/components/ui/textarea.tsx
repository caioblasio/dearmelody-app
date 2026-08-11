import * as React from "react"

import { cn } from "../../lib/utils"

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[6.5rem] w-full rounded-2xl border border-warm-border bg-card-bg px-4 py-3 text-base text-ink placeholder:text-muted outline-none transition-all duration-200 focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = "Textarea"

export { Textarea }
