import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const safeAmount = (amount) => {
  return isNaN(amount) || amount === undefined ? 0 : amount
}
