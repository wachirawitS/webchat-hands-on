import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRelativeTime(timestamp: string | Date): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInMs = now.getTime() - past.getTime()
  const diffInSeconds = Math.floor(diffInMs / 1000)
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  if (diffInYears > 0) {
    return diffInYears === 1 ? '1 year' : `${diffInYears} years`
  } else if (diffInMonths > 0) {
    return diffInMonths === 1 ? '1 month' : `${diffInMonths} months`
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day' : `${diffInDays} days`
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? '1 hour' : `${diffInHours} hours`
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? '1 min' : `${diffInMinutes} minutes`
  } else {
    return 'just now'
  }
}
