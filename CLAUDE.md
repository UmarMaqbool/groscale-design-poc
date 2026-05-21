# GroScale Design POC — Agent Instructions

> Read this file first when resuming work. It captures everything needed to continue building the POC.
>
> **For design tokens, color tables, component anatomy, type scale, and every other styling detail, see [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md).** That doc is the source of truth for design. This file covers project layout, conventions, and resume-work workflow.

---

## Project Goal

Build a **fully functional Next.js POC** of the redesigned GroScale Portal — a logistics platform for managing packages, carriers, shipments, reporting, SMS communications, and tracking.

**Use case:** Internal company presentation to demo the new design system on top of working interactions (with mock data — no backend).

**Source of truth:** Figma file `ERXAbJz6PK3gGdnktDdcqC` (GroScale Design)
URL: https://www.figma.com/design/ERXAbJz6PK3gGdnktDdcqC/GroScale-Design

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 14.2.35** (App Router) |
| Language | **TypeScript 5** (strict) |
| Styling | **Tailwind CSS 3.4** + CSS variables for tokens |
| UI primitives | **shadcn/ui** (manually added — Radix UI + cva) |
| Icons | **lucide-react** |
| Charts | **recharts** |
| Forms / dates | **react-day-picker 8** + **date-fns 3** |
| State (server) | **@tanstack/react-query 5** (configured but not yet used — will be when API stubs land) |
| State (UI) | React Context per feature |
| Toasts | **sonner** |
| Theme | **next-themes** (light + dark, class strategy) |
| Font | **Inter** via `next/font/google` (weights 400/500/600/700) |

**Node:** v24 / npm v11
**Dev port:** **3002** (port 3000 has another process; do not change)

---

## Design Tokens & Styling

**See [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md) for the full reference** — every color (light + dark), the 4-layer dark surface system, typography scale, spacing, radius, shadows, component anatomy (every shadcn primitive with classes), chart palettes, and patterns.

Quick orientation only:
- Tokens live in `app/globals.css` as HSL channel-only CSS variables (`:root` = light, `.dark` = dark).
- Tailwind maps them in `tailwind.config.ts` so utilities like `bg-primary/40` work.
- Brand: GroScale Green `#79B26B` (`--primary`).
- Light bg: `#EFEFEF` · Dark bg: pure-black 4-layer ramp (`#000` → `#0D0D0D` → `#131313` → `#1A1A1A`).
- Font: Inter via `next/font/google` (see Known Inconsistency #1 in the guidelines about Helvetica references).
- Single dark theme — no runtime palette switcher.

---

## Architecture

```
Groscale-design-poc/
├── app/
│   ├── globals.css              ← All design tokens (CSS vars). See DESIGN_GUIDELINES.md
│   ├── layout.tsx               ← Root layout (loads Inter from next/font/google)
│   ├── page.tsx                 ← Dashboard (currently the only page)
│   └── providers.tsx            ← QueryClientProvider + ThemeProvider + Toaster
│
├── components/
│   ├── ui/                      ← shadcn primitives (manually added)
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx           ← cva variants: default, secondary, outline, ghost, destructive, link
│   │   ├── calendar.tsx         ← react-day-picker wrapped to look shadcn
│   │   ├── card.tsx
│   │   ├── date-range-picker.tsx ← Two SingleField popovers (Start + End)
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx            ← Side drawer
│   │   ├── switch.tsx
│   │   └── tabs.tsx
│   │
│   └── app/                     ← App-level layout (NOT business components)
│       ├── AppShell.tsx         ← <SidebarProvider><Sidebar /><TopBar />{children}
│       ├── Sidebar.tsx          ← Logo + nav, supports collapsed state
│       ├── TopBar.tsx           ← Sidebar toggle, search, theme, notifications, user menu
│       └── sidebarStore.tsx     ← Sidebar collapse context (NOTE: must be .tsx, has JSX)
│
├── features/
│   └── dashboard/
│       ├── DashboardContext.tsx ← Date range + filters state (pending vs applied)
│       ├── hooks/
│       │   └── useFilteredData.ts ← Scales mock numbers by selected range
│       ├── components/
│       │   ├── DashboardHeader.tsx       ← Title + DateRangePicker + Apply + filter icon
│       │   ├── DashboardFiltersSheet.tsx ← Right drawer: status chips, carrier, region
│       │   ├── KpiCard.tsx
│       │   ├── DailyPackageChart.tsx     ← recharts BarChart + tab toggle
│       │   └── FailedDeliveryChart.tsx   ← recharts PieChart
│       └── index.ts             ← Barrel exports
│
├── lib/
│   └── utils.ts                 ← cn(), formatCurrency(), formatNumber()
│
├── mocks/
│   └── dashboard.ts             ← KPIs, daily package data, failure breakdown
│
├── public/
│   └── logo.png                 ← Downloaded from Figma (640x160 PNG)
│
├── .claude/
│   ├── launch.json              ← Preview server config (next-dev on port 3002)
│   └── settings.local.json      ← Local Claude Code settings
│
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json                ← @/* alias → ./*
├── next.config.mjs              ← Allows images from unsplash, dicebear, github
└── package.json
```

---

## Hard Rules (NEVER Break These)

1. **No `any` type.** Use `unknown` or proper interfaces.
2. **shadcn/ui first.** Always check `components/ui/` before creating a new primitive. Add via shadcn conventions (Radix + cva + cn).
3. **No font-family overrides in components** — Inter is set on `<html>` via the `--font-sans` CSS var.
4. **No raw hex colors in components.** Use Tailwind tokens (`text-primary`, `bg-card`, `border-gray-200`). Hex is OK only for inline chart colors that mirror Figma.
5. **All buttons must have working `onClick`.** This is an interactive POC — every clickable element must do something (toast at minimum).
6. **Mock data only.** Do not introduce real API calls. Add to `mocks/{feature}.ts`.
7. **Feature isolation.** Business components live in `features/{name}/`. Only layout primitives go in `components/app/`.
8. **Path alias is `@/*`** mapped to project root. Use it everywhere (`@/components/ui/button`, `@/features/dashboard`).
9. **Date handling:** use **date-fns 3** (`format`, `subDays`, `differenceInDays`). Never `new Date()` math directly.
10. **Toasts:** `import { toast } from 'sonner'` — every action confirms success/error to user.
11. **Don't downgrade `next`** — must stay `^14.2.35` (security patch).

---

## Conventions

### Component naming
- Files: `PascalCase.tsx` for components, `camelCase.ts(x)` for hooks/utils/contexts
- One component per file (except for closely-related sub-components like `Card`/`CardHeader`/`CardContent`)
- Use `forwardRef` for primitives that may need refs
- Always export named (no default) — except `app/page.tsx` which Next.js requires as default

### State management
- **Server data:** React Query hooks (when added)
- **Feature state:** React Context per feature (e.g., `DashboardContext`)
- **Local UI state:** `useState` (modals, hover, selected tab)
- **Theme:** `useTheme` from `next-themes`

### Interactivity rules
- Date pickers must use the `DateRangePicker` from `@/components/ui/date-range-picker`
- All "open in popup" patterns use shadcn `Popover` or `Sheet`
- All menus use shadcn `DropdownMenu`
- All tab toggles use shadcn `Tabs`
- Copy/download icons on cards must produce a CSV with toast confirmation

---

## Figma Reference

**File key:** `ERXAbJz6PK3gGdnktDdcqC`
**Page to build from:** `💬 To Review` (id `1:2`)

### Sections in the Figma "To Review" page

| # | Section | Frames | Status |
|---|---|---|---|
| 1 | Dashboard design (light) | 5 | ✅ Built (`134:22617`) |
| 2 | Packages Design Update | 4 | ✅ Built (`185:18461`) |
| 3 | Reporting Design Update | 11 | Pending |
| 4 | Dashboard Dark Version | 3 | Pending (will reuse light components) |
| 5 | Communication (SMS) | 4 | Pending |
| 6 | Updated Communication Dashboard | 5 | Pending |
| 7 | Tracking Samples | 5 | Pending |
| 8 | Algorithm | 5 | Pending |
| 9 | Package Aging | 3 | Pending |
| 10 | Updated (Reporting variants) | 3 | Pending |

### How to fetch a frame
Use the Figma MCP (already authenticated):
```
mcp__plugin_figma_figma__get_design_context(fileKey="ERXAbJz6PK3gGdnktDdcqC", nodeId="<id>")
mcp__plugin_figma_figma__get_screenshot(fileKey="ERXAbJz6PK3gGdnktDdcqC", nodeId="<id>")
mcp__plugin_figma_figma__get_variable_defs(fileKey="ERXAbJz6PK3gGdnktDdcqC", nodeId="<id>")
```

The Figma MCP returns React+Tailwind reference code with absolute positioning. **Always** convert that to clean flex/grid layouts using project conventions — never paste it as-is.

---

## What's Already Built — Dashboard (`/`)

Fully functional. Every interaction works.

| Feature | Status | Notes |
|---|---|---|
| Sidebar with 6 nav items | ✅ | Active state on Dashboard. Other links navigate to `/packages`, `/analytics`, etc. (404 for now) |
| Sidebar collapse toggle | ✅ | Reduces width 260→72px, shows icon-only |
| TopBar search | ✅ | Functional input |
| Theme toggle (sun/moon pill) | ✅ | Light ↔ dark via next-themes (dark tokens not yet hand-tuned per screen) |
| Notification bell + popover | ✅ | 4 mock notifications, click any → toast |
| User dropdown menu | ✅ | Profile / Settings / Help / Sign out — each toasts |
| Date range picker (Start/End) | ✅ | Calendar popover, `min`/`max` constraints, default = last 7 days |
| Apply button | ✅ | Disabled when pending == applied; commits state and toasts |
| Filters drawer (slider icon) | ✅ | Right sheet with status chips, carrier select, region select, Apply/Reset/Cancel |
| KPI cards (×5) | ✅ | Values scale by selected date range |
| Daily Package bar chart | ✅ | recharts, max bar highlighted green, Daily/Previous tabs |
| Failed Delivery pie chart | ✅ | recharts, 5 green-shade slices, hover tooltip |
| Copy chart data | ✅ | CSV to clipboard + toast |
| Download chart CSV | ✅ | Triggers browser download + toast |

---

## How to Resume Work

### Quickstart (each new session)
```bash
# Always start the dev server via the preview tool
mcp__Claude_Preview__preview_start({ name: "next-dev" })
# Server runs on http://localhost:3002
```

### Building the next screen — exact playbook
1. **Read this file** + the relevant `features/{name}/FEATURE.md` (if it exists)
2. **Pick a frame** from the table above. Confirm with user which to build.
3. **Fetch from Figma:**
   - `get_metadata` (only if structure unclear)
   - `get_design_context` (gets React+Tailwind reference + screenshot URL)
   - `get_variable_defs` (for any additional tokens not yet captured)
4. **Plan** the component breakdown using the Figma screenshot as source-of-truth.
5. **Build:**
   - Create `features/{name}/` directory
   - Add types in `features/{name}/types.ts`
   - Add mock data in `mocks/{name}.ts`
   - Create context if state is shared (`features/{name}/{Name}Context.tsx`)
   - Build components in `features/{name}/components/`
   - Add barrel export in `features/{name}/index.ts`
   - Create the route page in `app/{name}/page.tsx`
   - Wrap with `AppShell` (and feature provider if any)
6. **Make every element interactive.** No dead buttons. Toast on every action.
7. **Verify:**
   - `npm run typecheck` — must pass
   - `npm run build` — must pass
   - Test interactions via `mcp__Claude_Preview__preview_eval` clicks
   - Take a screenshot at 1440×900 to compare with Figma
8. **Update this file** with the new section's status.

### Sidebar nav for new screens
Update `components/app/Sidebar.tsx` `navItems` only if a new top-level area is added. Most new pages already have a stub link (Packages, Analytics, Reporting, Algorithms, Communication).

---

## Known Gotchas

1. **Port 3000 is occupied** by another process (not ours). We run on **3002**. Don't change.
2. **`.claude/launch.json` uses `npx next dev -p 3002`** so it's independent of `package.json` script.
3. **`sidebarStore.tsx` MUST stay `.tsx`** (it has JSX). Renaming back to `.ts` will 500 the dev server.
4. **Clear `.next/` cache** if dev server returns 500 after a rename: `rm -rf .next` then restart.
5. **Hydration:** `subDays(new Date(), 7)` runs once in state initializer — no SSR mismatch because `app/page.tsx` is `'use client'`.
6. **Font:** Inter is loaded by `next/font/google` in `app/layout.tsx` as the `--font-sans` CSS var. Tailwind's default `font-sans` resolves to it.
7. **shadcn animations** (`animate-in`, `fade-in-0`, `slide-in-from-top-2`) require `tailwindcss-animate` plugin — already configured.
8. **The Figma file has NO design system page** — tokens were extracted from screen frames via `get_variable_defs`.
9. **Marketplace mocks were removed.** Don't reintroduce carriers/shippers/shipments — this is the existing portal redesign, not a separate marketplace.

---

## Useful Commands

```bash
npm run dev          # Dev server (port 3002)
npm run build        # Production build (must pass before "done")
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
npm run format       # prettier write all
```

```bash
# Clear Next.js cache (if 500 errors after renames)
rm -rf .next

# Free port 3000 (if needed)
lsof -ti:3000 | xargs kill -9
```

---

## Open Questions for the User

When resuming, confirm:
- **Which screen to build next?** (See section table above.)
- **Should we start adding routes for the sidebar links** even before they're styled? (Currently they 404.)
- **Dark mode polish:** The theme toggle works but dark surfaces haven't been hand-tuned per screen. Worth fixing only after light mode is mostly done.

---

## Last Session Summary

**Completed:**
- Scaffolded Next.js 14 + TypeScript + Tailwind
- Extracted real Figma design tokens (colors, typography, gray scale)
- Added shadcn/ui primitives (10 components)
- Built **Dashboard screen** at `/` with full interactivity (sidebar, topbar, header, KPIs, both charts, filters drawer, theme toggle, dropdowns, popovers)
- Wired CSV copy/download, toast notifications throughout
- Set up `.claude/launch.json` for the preview tool

**Next up:** Pick the next Figma section to build (likely Packages — `185:18461`, 4 frames).
