import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, resolving conflicts with tailwind-merge
 * and handling conditional classes with clsx.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
