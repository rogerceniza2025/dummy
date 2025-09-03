"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils/cn"

/**
 * React wrapper around Radix UI's Label root that applies project default styles and forwards all props.
 *
 * Renders a LabelPrimitive.Root with a `data-slot="label"` attribute and a composed `className`
 * (default utility classes + any `className` passed in). All other props are forwarded to the underlying Radix component.
 *
 * @param className - Optional additional class names to merge with the component's default styles.
 * @returns A LabelPrimitive.Root element with merged styling and forwarded props.
 */
function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
