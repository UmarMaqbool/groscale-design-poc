'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function AuthThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="relative flex h-8 w-[55px] items-center rounded-full bg-card ring-1 ring-border transition-colors hover:bg-muted"
    >
      <span
        className={`absolute flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          isDark ? 'left-1 bg-primary text-primary-foreground' : 'left-1 text-muted-foreground'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </span>
      <span
        className={`absolute flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200 ${
          !isDark ? 'right-1 bg-primary text-primary-foreground' : 'right-1 text-muted-foreground'
        }`}
      >
        <Sun className="h-3.5 w-3.5" />
      </span>
    </button>
  )
}
