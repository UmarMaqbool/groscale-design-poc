import { cn } from '@/lib/utils'

/**
 * Brand mark — the green hex icon, on its own.
 * Uses `currentColor` so the parent's text-color token controls the tint.
 * Wrap in `text-primary` (default) to render in brand green.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn('text-primary', className)}
      aria-hidden
    >
      <path
        d="M16 2.5 L27.5 9 L27.5 23 L16 29.5 L4.5 23 L4.5 9 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 10 L22 13.25 L22 19.75 L16 23 L10 19.75 L10 13.25 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Full GroScale wordmark — hex icon + "Gro" + "Scale".
 *
 * Uses the page `foreground` token so the wordmark adapts to any surface
 * (sidebar in dark = white-on-black; auth in light = near-black on light bg).
 *  - "Gro"    → text-foreground       (white in dark, near-black in light)
 *  - "Scale"  → text-foreground/60    (greyed, both themes)
 *
 * When `collapsed`, only the mark renders.
 */
export function Logo({
  collapsed = false,
  className,
}: {
  collapsed?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LogoMark className="h-7 w-7 shrink-0" />
      {!collapsed && (
        <span className="text-xl font-bold leading-none tracking-tight">
          <span className="text-foreground">Gro</span>
          <span className="text-foreground/60">Scale</span>
        </span>
      )}
    </div>
  )
}
