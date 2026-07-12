import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral/30",
  {
    variants: {
      variant: {
        default:
          "btn-coral-gradient text-on-primary shadow-sm hover:scale-[1.03] active:scale-[0.98]",
        outline:
          "border-2 border-coral bg-transparent text-coral hover:bg-chip-bg/50",
        ghost: "text-coral hover:bg-chip-bg/50",
        link: "text-coral underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  ),
)
Button.displayName = "Button"

// eslint-disable-next-line react-refresh/only-export-components -- share CVA helpers with variants
export { Button, buttonVariants }
