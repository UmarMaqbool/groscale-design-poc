'use client'

import { CheckCircle2, AlertTriangle, Truck, Sparkles } from 'lucide-react'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { activityFeed, type FeedItem } from '@/mocks/analytics'

const iconMap: Record<FeedItem['icon'], typeof CheckCircle2> = {
  check: CheckCircle2,
  alert: AlertTriangle,
  truck: Truck,
  sparkle: Sparkles,
}

const toneClass: Record<FeedItem['tone'], string> = {
  success: 'bg-primary/15 text-primary',
  warning: 'bg-warning/15 text-warning',
  destructive: 'bg-destructive/15 text-destructive',
}

export function ActivityFeedCard() {
  const handleCopy = async () => {
    const csv = activityFeed.map((it) => `${it.tone},${it.parts.map((p) => p.text).join('')},${it.meta}`).join('\n')
    try {
      await navigator.clipboard.writeText(csv)
      toast.success('Activity feed copied')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const csv = activityFeed.map((it) => `${it.tone},${it.parts.map((p) => p.text).join('')},${it.meta}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `recent-activity-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded recent-activity.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Recent Activity</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">Network alerts and milestones</p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button
              onClick={handleCopy}
              className="rounded-md p-1.5 hover:bg-accent hover:text-foreground"
              aria-label="Copy data"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="rounded-md p-1.5 hover:bg-accent hover:text-foreground"
              aria-label="Download CSV"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ul className="flex flex-col">
          {activityFeed.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <li
                key={item.id}
                className={cn(
                  'flex gap-3 py-3',
                  i !== activityFeed.length - 1 && 'border-b border-border'
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-md',
                    toneClass[item.tone]
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug text-foreground">
                    {item.parts.map((part, idx) =>
                      part.bold ? (
                        <strong key={idx} className="font-semibold">
                          {part.text}
                        </strong>
                      ) : (
                        <span key={idx}>{part.text}</span>
                      )
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{item.meta}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </Card>
  )
}
