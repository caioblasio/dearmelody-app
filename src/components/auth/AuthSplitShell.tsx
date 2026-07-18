import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type AuthSplitShellProps = {
  brand: ReactNode
  mobileHeader: ReactNode
  children: ReactNode
  /** Desktop brand panel side. Login = left, signup = right. */
  brandSide?: 'left' | 'right'
}

export function AuthSplitShell({
  brand,
  mobileHeader,
  children,
  brandSide = 'left',
}: AuthSplitShellProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#E9E7EF] px-4 py-8 selection:bg-chip-bg selection:text-ink sm:px-6 sm:py-12">
      <div
        className={cn(
          'auth-card-shadow flex w-full max-w-[1060px] flex-col overflow-hidden rounded-[32px] bg-surface md:flex-row',
          brandSide === 'right' && 'md:flex-row-reverse',
        )}
      >
        <div className="hidden md:block md:w-[460px] md:shrink-0">{brand}</div>
        <div className="md:hidden">{mobileHeader}</div>
        <div className="flex min-w-0 flex-1 items-center px-6 py-8 sm:px-10 sm:py-12 md:px-[60px] md:py-12">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
