import * as React from "react"

import { cn } from "../../lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-warm-border bg-card-bg p-lg shadow-sm",
        className,
      )}
      {...props}
    />
  )
}

export { Card }
