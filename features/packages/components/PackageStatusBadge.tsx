import { cn } from '@/lib/utils'
import type { PackageStatus } from '../types'

const styles: Record<PackageStatus, string> = {
  delivered: 'bg-success-soft text-foreground/80 ring-success/30',
  in_transit: 'bg-primary-100 text-primary-800 ring-primary/20',
  out_for_delivery: 'bg-primary/15 text-primary-800 ring-primary/30',
  pending: 'bg-secondary text-secondary-foreground ring-border',
  delayed: 'bg-warning/15 text-warning ring-warning/30',
}

const dotColors: Record<PackageStatus, string> = {
  delivered: 'bg-success',
  in_transit: 'bg-primary',
  out_for_delivery: 'bg-primary-700',
  pending: 'bg-muted-foreground',
  delayed: 'bg-warning',
}

export const PACKAGE_STATUS_LABEL: Record<PackageStatus, string> = {
  delivered: 'Delivered',
  in_transit: 'In Transit',
  out_for_delivery: 'Out for Delivery',
  pending: 'Pending',
  delayed: 'Delayed',
}

export function PackageStatusBadge({
  status,
  className,
}: {
  status: PackageStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        styles[status],
        className,
      )}
    >
      <span className={cn('mr-1.5 inline-block h-1.5 w-1.5 rounded-full', dotColors[status])} />
      {PACKAGE_STATUS_LABEL[status]}
    </span>
  )
}
