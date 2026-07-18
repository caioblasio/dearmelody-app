import { Drawer as DrawerPrimitive } from 'vaul'
import {
  forwardRef,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ComponentRef,
  type HTMLAttributes,
} from 'react'

import { cn } from '@/lib/utils'

function Drawer({
  shouldScaleBackground = true,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
}

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-ink/40', className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[85vh] flex-col rounded-t-[20px] border border-warm-border bg-card-bg',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-warm-border" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = 'DrawerContent'

function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
}

function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
}

const DrawerTitle = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('font-heading text-lg font-semibold text-ink', className)}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted', className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
