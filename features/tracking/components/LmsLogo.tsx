import { cn } from '@/lib/utils'

interface LmsLogoProps {
  className?: string
  /** Tailwind bg-* class — masks colored bg through the logo silhouette */
  colorClassName?: string
}

/**
 * Last Mile Solutions logo — Figma uses the original PNG as an alpha mask
 * so the same artwork can be tinted any color. We replicate that with
 * CSS mask-image. Default size matches Figma (313.7 × 74).
 */
export function LmsLogo({ className, colorClassName = 'bg-primary' }: LmsLogoProps) {
  return (
    <div
      role="img"
      aria-label="Last Mile Solutions"
      className={cn(
        'h-[74px] w-[313.7px] max-[475px]:h-[69px] max-[475px]:w-[292.6px] [mask-image:url(/tracking/lms-logo-mask.png)] [mask-size:100%_100%] [mask-repeat:no-repeat]',
        colorClassName,
        className
      )}
    />
  )
}
