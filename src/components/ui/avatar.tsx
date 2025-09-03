"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils/cn"

/**
 * Avatar root component — a styled wrapper around Radix's Avatar.Root.
 *
 * Renders an AvatarPrimitive.Root with `data-slot="avatar"`, applies default avatar sizing and shape classes, merges any provided `className`, and forwards all other props to the underlying Radix primitive.
 *
 * @returns The avatar root JSX element.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/**
 * Image element for an avatar that applies default sizing and forwards all props to Radix's Avatar.Image.
 *
 * The provided `className` is merged with the component's base classes (`"aspect-square size-full"`).
 *
 * @param className - Optional additional CSS classes to merge with the default avatar image classes.
 * @returns A JSX element rendering `AvatarPrimitive.Image` with merged classes and forwarded props.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

/**
 * Fallback content for an Avatar — shown when the image is unavailable.
 *
 * Renders a Radix `AvatarPrimitive.Fallback` with default circular, centered styling
 * and `data-slot="avatar-fallback"`. Any `className` provided will be merged with
 * the defaults; all other props are forwarded to the underlying Radix component.
 *
 * @returns A JSX element that serves as the avatar fallback.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
