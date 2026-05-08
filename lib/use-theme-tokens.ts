'use client'

import { useEffect, useState } from 'react'

/**
 * Resolve shadcn HSL CSS variables to their current `hsl(...)` values.
 *
 * Recharts (and other libraries that emit raw SVG attributes) cannot read
 * CSS custom properties directly. This hook reads `--<name>` from the
 * document root and returns a record of `hsl(<token>)` strings keyed by
 * token name.
 *
 * Re-runs whenever the `class` attribute on `<html>` changes (i.e. when
 * `next-themes` toggles between `light` / `dark`).
 *
 * @example
 * const tokens = useThemeTokens(['chart-1', 'chart-2', 'border'])
 * <Bar fill={tokens['chart-1']} />
 */
export function useThemeTokens<T extends string>(tokenNames: readonly T[]): Record<T, string> {
  const [tokens, setTokens] = useState<Record<T, string>>(
    () => Object.fromEntries(tokenNames.map((n) => [n, ''])) as Record<T, string>
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.documentElement

    const read = () => {
      const next = Object.fromEntries(
        tokenNames.map((name) => {
          const raw = getComputedStyle(root).getPropertyValue(`--${name}`).trim()
          return [name, raw ? `hsl(${raw})` : '']
        })
      ) as Record<T, string>
      setTokens(next)
    }

    read()

    const observer = new MutationObserver(read)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
    // tokenNames is treated as a stable list (caller passes a literal)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return tokens
}
