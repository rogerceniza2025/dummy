"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils/cn"

/**
 * Root dialog wrapper around Radix UI's DialogPrimitive.Root.
 *
 * Renders a Radix Dialog root element with data-slot="dialog" and forwards all received props
 * to the underlying primitive (e.g., `open`, `onOpenChange`). Use this component as the
 * top-level container for dialog composition with the provided subcomponents.
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * Dialog trigger wrapper around Radix UI's Trigger.
 *
 * Renders a Radix Dialog Trigger with `data-slot="dialog-trigger"` and forwards all props to the underlying primitive.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * Wraps Radix's Portal primitive and marks it with `data-slot="dialog-portal"`.
 *
 * Forwards all received props to `DialogPrimitive.Portal`.
 *
 * @returns The rendered Radix Portal element with slot attribute applied.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * Wrapper around Radix's Close that forwards all props and adds `data-slot="dialog-close"`.
 *
 * Renders a Dialog close trigger element with the same API as `DialogPrimitive.Close`; all props are passed through.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * Radix Overlay wrapper used as the dialog backdrop.
 *
 * Renders a DialogPrimitive.Overlay with data-slot="dialog-overlay", applying
 * default positioning, a translucent black background, and animation hooks
 * driven by Radix `data-state` attributes. Any `className` provided is merged
 * with the defaults and all other props are forwarded to the underlying
 * Radix primitive.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * Composes a dialog content area inside a portal with an overlay and optional close button.
 *
 * Renders a centered, styled Radix `Content` wrapped in the module's `DialogPortal` and `DialogOverlay`.
 * Accepts all props supported by `DialogPrimitive.Content`; `className` is merged with the component's defaults.
 *
 * @param showCloseButton - When true (default), renders a close button in the top-right corner that triggers the dialog close action.
 * @returns A React element containing the dialog content, overlay, and portal.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * Dialog header container.
 *
 * Renders a div with data-slot="dialog-header" and default layout classes (vertical stack, small gap, centered text on narrow screens, left-aligned on sm+). Merges any provided `className` with the component's base classes.
 *
 * @param className - Additional CSS classes to apply to the header container.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

/**
 * Layout container for dialog actions, styled for responsive footer placement.
 *
 * Renders a <div> with `data-slot="dialog-footer"` and responsive layout classes:
 * defaults to a column-reverse stacked layout on small screens and a right-aligned
 * row on larger screens. Merges any provided `className` with the base classes.
 *
 * @param className - Optional additional class names to merge with the default footer layout.
 * @returns A JSX element representing the dialog footer container.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * Styled wrapper around Radix `DialogPrimitive.Title`.
 *
 * Renders a dialog title with `data-slot="dialog-title"` and applies base typography classes (`text-lg leading-none font-semibold`). Any `className` passed will be merged with the defaults; all other props are forwarded to the underlying Radix Title.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Wrapper around Radix `DialogPrimitive.Description` that applies a data-slot attribute and default styling.
 *
 * Merges the provided `className` with base text styles and forwards all other props to the underlying Radix component.
 *
 * @returns A `DialogPrimitive.Description` element with `data-slot="dialog-description"` and composed classes.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
