'use client'

/* =============================================================================
 * Dark-mode colorway store
 * =============================================================================
 * Manages which of the three dark-mode palettes (.colorway-1/2/3) is applied
 * to <html>. The actual surface colors live in `app/globals.css` under
 * `.dark.colorway-N`. The colorway only has visual effect in dark mode — in
 * light mode the class is still attached but those CSS rules don't apply.
 *
 * Hydration: a tiny inline <script> in `app/layout.tsx` applies the saved
 * class synchronously before paint, so we never flash the default palette.
 * ========================================================================== */

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type Colorway = 'colorway-1' | 'colorway-2' | 'colorway-3'

export const COLORWAYS: ReadonlyArray<{
  id: Colorway
  label: string
  description: string
  swatches: [string, string, string, string]
}> = [
  {
    id: 'colorway-1',
    label: 'Blue + Black',
    description: 'Cool, navy-leaning surfaces',
    swatches: ['#000000', '#0B0C14', '#11151E', '#1B1F2A'],
  },
  {
    id: 'colorway-2',
    label: 'Green',
    description: 'All-green surface ramp',
    swatches: ['#0A140E', '#0E1812', '#1C3123', '#34503D'],
  },
  {
    id: 'colorway-3',
    label: 'Green + Black',
    description: 'Black foundation, green elevation',
    swatches: ['#000000', '#0A140E', '#0E1812', '#1C3123'],
  },
] as const

export const COLORWAY_STORAGE_KEY = 'groscale-colorway'
export const DEFAULT_COLORWAY: Colorway = 'colorway-1'

const ALL_IDS: Colorway[] = COLORWAYS.map((c) => c.id)

interface ColorwayCtx {
  colorway: Colorway
  setColorway: (c: Colorway) => void
}

const ColorwayContext = createContext<ColorwayCtx | undefined>(undefined)

export function ColorwayProvider({ children }: { children: React.ReactNode }) {
  const [colorway, setColorwayState] = useState<Colorway>(DEFAULT_COLORWAY)

  // Sync state from whichever class the inline boot script applied. We don't
  // re-write the class here on mount — that would be a no-op anyway since the
  // boot script already did it before React hydrated.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(COLORWAY_STORAGE_KEY) as Colorway | null
      if (saved && ALL_IDS.includes(saved)) setColorwayState(saved)
    } catch {
      // localStorage unavailable (private mode, etc.) — fall back to default.
    }
  }, [])

  const setColorway = useCallback((next: Colorway) => {
    setColorwayState(next)
    try {
      localStorage.setItem(COLORWAY_STORAGE_KEY, next)
    } catch {
      // ignore
    }
    const html = document.documentElement
    ALL_IDS.forEach((id) => html.classList.remove(id))
    html.classList.add(next)
  }, [])

  return (
    <ColorwayContext.Provider value={{ colorway, setColorway }}>
      {children}
    </ColorwayContext.Provider>
  )
}

export function useColorway() {
  const ctx = useContext(ColorwayContext)
  if (!ctx) throw new Error('useColorway must be used within ColorwayProvider')
  return ctx
}
