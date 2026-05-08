'use client'

import Image from 'next/image'
import { Handshake, LineChart, Scale, type LucideIcon } from 'lucide-react'

interface FeatureProps {
  icon: LucideIcon
  title: string
  description: string
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <li className="flex gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary-700 dark:text-primary-200">
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{description}</p>
      </div>
    </li>
  )
}

export function AuthBrandPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-gradient-to-br from-primary-50 via-card to-primary-100 p-12 lg:flex dark:from-primary-900/30 dark:via-card dark:to-primary-700/20">
      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative">
        <Image
          src="/logo.png"
          alt="GroScale"
          width={140}
          height={36}
          priority
          className="h-9 w-auto dark:brightness-0 dark:invert"
        />
      </div>

      <div className="relative max-w-md">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-foreground">
          Discover.
          <br />
          Negotiate.
          <br />
          Deliver.
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          GroScale is the marketplace where shippers and carriers connect, negotiate, and sign
          contracts directly — no brokers, no markups.
        </p>

        <ul className="mt-10 flex flex-col gap-5">
          <Feature
            icon={Handshake}
            title="Direct contracts"
            description="Skip the brokers. Sign with vetted partners in days, not quarters."
          />
          <Feature
            icon={Scale}
            title="Transparent rates"
            description="Compare rates, capacity and SLAs side-by-side — no hidden markups."
          />
          <Feature
            icon={LineChart}
            title="Live operations"
            description="Every package, route and exception — in one shared dashboard."
          />
        </ul>
      </div>

      <p className="relative text-xs text-muted-foreground">
        © 2026 GroScale. All rights reserved.
      </p>
    </div>
  )
}
