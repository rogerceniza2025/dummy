import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combine multiple `clsx`-style class inputs into a single class string and resolve Tailwind CSS conflicts.
 *
 * Accepts any number of `ClassValue` inputs (strings, arrays, objects, etc.), runs them through `clsx` to
 * produce a space-separated class list, then applies `twMerge` to resolve conflicting Tailwind utility classes
 * (keeping the last occurrence according to Tailwind precedence).
 *
 * @param inputs - One or more `ClassValue` items to compose into the final class string.
 * @returns A single string of merged class names with Tailwind conflicts resolved.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
