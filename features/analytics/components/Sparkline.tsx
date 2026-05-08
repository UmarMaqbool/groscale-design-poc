'use client'

import { useId } from 'react'

interface SparklineProps {
  data: number[]
  color: string
  width?: number
  height?: number
  fill?: boolean
}

function smoothPath(points: Array<[number, number]>, closeY?: number): string {
  if (points.length < 2) return ''
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`
  }
  if (closeY !== undefined) {
    d += ` L ${points[points.length - 1][0]} ${closeY} L ${points[0][0]} ${closeY} Z`
  }
  return d
}

export function Sparkline({ data, color, width = 220, height = 40, fill = true }: SparklineProps) {
  const id = useId().replace(/:/g, '')
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const x = (i: number) => (width * i) / (data.length - 1)
  const y = (v: number) => height - 2 - ((v - min) / range) * (height - 6)
  const points = data.map((v, i) => [x(i), y(v)] as [number, number])
  const gradId = `spark-${id}`

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={smoothPath(points, height)} fill={`url(#${gradId})`} />}
      <path d={smoothPath(points)} stroke={color} strokeWidth="1.75" fill="none" />
    </svg>
  )
}
