'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function AuthThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  // `useTheme()` returns undefined during SSR / first client render; gate the
  // indicator until after hydration so we never briefly highlight the wrong icon.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const themeState: 'unknown' | 'light' | 'dark' = !mounted
    ? 'unknown'
    : resolvedTheme === 'dark'
      ? 'dark'
      : 'light'
  const isDark = themeState === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative flex h-8 w-[55px] items-center rounded-full bg-card ring-1 ring-border transition-colors hover:bg-accent"
    >
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          themeState === 'dark'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </span>
      <span
        className={`absolute right-1 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          themeState === 'light'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground'
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </span>
    </button>
  )
}
