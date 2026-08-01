import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "border-coral/30 bg-chip-bg text-ink",
        destructive: "border-error/30 bg-error_container text-on-error_container",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      role="alert"
      {...props}
    />
  )
}

export { Alert, alertVariants }
