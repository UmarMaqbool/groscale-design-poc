import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Brand mark — the green hex icon, on its own.
 * Sourced from `public/logo-mark.svg` (Figma export). Native ratio 44×38.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-mark.svg"
      alt="GroScale"
      width={44}
      height={38}
      priority
      className={cn(className)}
    />
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
}: Readonly<{
  collapsed?: boolean
  className?: string
}>) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LogoMark className="h-7 w-auto shrink-0" />
      {!collapsed && (
        <span className="text-xl font-bold leading-none tracking-tight">
          <span className="text-foreground">Gro</span>
          <span className="text-foreground/60">Scale</span>
        </span>
      )}
    </div>
  )
}
