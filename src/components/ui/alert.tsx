import * as React from "react"

import { cn } from "../../lib/utils"

function Alert({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-lg border border-error/30 bg-error_container px-4 py-3 text-sm text-on-error_container", className)}
      role="alert"
      {...props}
    />
  )
}

export { Alert }
