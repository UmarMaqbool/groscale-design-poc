'use client'

import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Card } from '@/components/ui/card'
import { funnel, type FunnelStage } from '@/mocks/analytics'

const shadeBg: Record<FunnelStage['shade'], string> = {
  700: 'bg-primary-700',
  600: 'bg-primary-600',
  500: 'bg-primary',
  400: 'bg-primary-400',
  200: 'bg-primary-200',
}

const shadeText: Record<FunnelStage['shade'], string> = {
  700: 'text-primary-foreground',
  600: 'text-primary-foreground',
  500: 'text-primary-foreground',
  400: 'text-primary-foreground',
  200: 'text-primary-900',
}

export function FunnelCard() {
  const max = funnel[0].value

  const handleCopy = async () => {
    const csv = ['stage,value,pct', ...funnel.map((f) => `${f.label},${f.value},${f.pct}`)].join('\n')
    try {
      await navigator.clipboard.writeText(csv)
      toast.success('Funnel data copied as CSV')
    } catch {
      toast.error('Could not copy to clipboard')
    }
  }

  const handleDownload = () => {
    const csv = ['stage,value,pct', ...funnel.map((f) => `${f.label},${f.value},${f.pct}`)].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `delivery-funnel-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded delivery-funnel.csv')
  }

  return (
    <Card className="rounded-[10px] border-0 p-5 shadow-card">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold leading-tight">Delivery Funnel</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Conversion across pipeline stages
            </p>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button
              onClick={handleCopy}
              className="rounded-md p-1.5 hover:bg-muted hover:text-foreground"
              aria-label="Copy data"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="rounded-md p-1.5 hover:bg-muted hover:text-foreground"
              aria-label="Download CSV"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          {funnel.map((stage) => (
            <div
              key={stage.label}
              className="grid grid-cols-[140px_1fr_80px] items-center gap-4"
            >
              <span className="truncate text-sm text-muted-foreground">{stage.label}</span>
              <div className="relative h-7 overflow-hidden rounded-md bg-muted">
                <div
                  className={`flex h-full items-center rounded-md px-2.5 text-xs font-medium ${shadeBg[stage.shade]} ${shadeText[stage.shade]}`}
                  style={{ width: `${(stage.value / max) * 100}%` }}
                >
                  {stage.pct}%
                </div>
              </div>
              <span className="text-right text-sm font-medium tabular-nums text-foreground">
                {stage.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
