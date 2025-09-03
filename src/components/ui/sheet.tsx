"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils/cn"

/**
 * Root Sheet component — a thin wrapper around Radix's SheetPrimitive.Root.
 *
 * Renders the Radix Root with a fixed `data-slot="sheet"` attribute and forwards all received props to the underlying primitive.
 *
 * @param props - Props passed through to the Radix Dialog Root (e.g., `open`, `onOpenChange`, `children`).
 */
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

/**
 * Sheet trigger wrapper that renders a Radix Trigger with a data-slot for composition.
 *
 * Renders `SheetPrimitive.Trigger` with `data-slot="sheet-trigger"` and forwards all received props to the underlying primitive.
 */
function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

/**
 * A convenience wrapper around Radix's Close primitive that marks the element as the sheet's close control.
 *
 * Renders `SheetPrimitive.Close` with a `data-slot="sheet-close"` attribute and forwards all received props.
 *
 * @returns A React element representing the sheet close trigger.
 */
function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

/**
 * Thin wrapper around Radix's Portal primitive that adds a `data-slot="sheet-portal"`.
 *
 * Forwards all received props to `SheetPrimitive.Portal`.
 */
function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

/**
 * Overlay/backdrop for the Sheet.
 *
 * Renders a Radix `Overlay` with `data-slot="sheet-overlay"`, a fixed semi-transparent backdrop,
 * and built-in state-based open/close animation classes. Any `className` passed will be merged
 * with the component's default styles; all other props are forwarded to the underlying primitive.
 *
 * @param className - Optional additional CSS classes to append to the default overlay styles.
 */
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

/**
 * The main panel content for the Sheet UI; renders the sliding panel, backdrop, and built-in close control.
 *
 * Renders inside a SheetPortal and includes a SheetOverlay. Positions and animates the panel based on `side`
 * ("top" | "right" | "bottom" | "left"), merging provided `className` with the component's base layout, animation,
 * and side-specific sizing/positioning classes. Also injects a built-in accessible close button in the top-right corner.
 *
 * @param side - Which edge the sheet should slide in from. Defaults to `"right"`. `right`/`left` produce a full-height panel with width; `top`/`bottom` produce an auto-height panel.
 * @param className - Additional CSS classes to merge with the component's base and side-specific classes.
 * @param children - Content to render inside the sheet panel.
 * @returns The Sheet content element (JSX).
 */
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

/**
 * Header container for a Sheet; provides default header layout and spacing.
 *
 * Renders a div with `data-slot="sheet-header"` and default classes for a
 * stacked header layout. Any `className` is merged with the defaults and
 * all other props are forwarded to the underlying div.
 *
 * @param className - Additional CSS class names to merge with the default header styles.
 * @returns A div element configured as the sheet header.
 */
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  )
}

/**
 * Footer region for the Sheet component.
 *
 * Renders a div with `data-slot="sheet-footer"` that stacks its children vertically,
 * applies `mt-auto` to push the footer to the bottom of the sheet, and uses padding
 * and gap spacing. Any `className` passed in is merged with the default layout
 * classes and all other div props are forwarded.
 */
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/**
 * A styled wrapper around Radix's Sheet Title primitive.
 *
 * Renders `SheetPrimitive.Title` with a `data-slot="sheet-title"` attribute, applies
 * default typographic classes (`text-foreground font-semibold`), merges any `className`
 * passed in, and forwards all other props to the underlying primitive.
 */
function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  )
}

/**
 * Renders the sheet's descriptive text using Radix's Description primitive.
 *
 * Accepts all props supported by `SheetPrimitive.Description`. Adds `data-slot="sheet-description"`
 * and merges the provided `className` with default muted, small-text typographic styles.
 */
function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
