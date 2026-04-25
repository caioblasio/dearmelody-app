import * as React from "react"

import { cn } from "../../lib/utils"

function Checkbox({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-outline-variant text-primary focus-visible:ring-primary",
        className,
      )}
      {...props}
    />
  )
}

export { Checkbox }
