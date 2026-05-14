import type { Config } from 'tailwindcss'

/* =============================================================================
 * GroScale — Tailwind Configuration
 * =============================================================================
 *
 * SOURCE OF TRUTH
 * ---------------
 * Every color, font and surface in this app is driven by a CSS variable
 * declared in `app/globals.css` (`:root` for light, `.dark` for dark mode).
 * This file maps those variables into Tailwind utilities.
 *
 * RULES FOR CONTRIBUTORS
 * ----------------------
 *  1. Never hard-code hex values inside components. If a color is missing,
 *     add a token to `globals.css` and expose it here.
 *  2. Token names are SEMANTIC (`bg-card`, `text-muted-foreground`,
 *     `border-subtle`) — not visual (`bg-dark-green`). Semantic names survive
 *     redesigns; visual names rot.
 *  3. Both themes must define every token. If a token only makes sense in
 *     one theme, prefix it (e.g. `--dark-only-*`) and document why.
 *  4. All colors use HSL channel-only syntax (e.g. `109 31% 56%`) so Tailwind
 *     can compose them with alpha modifiers (`bg-primary/40`).
 *
 * SPEC ALIGNMENT
 * --------------
 * Dark theme tokens follow the Marketplace MVP spec (`groscale-portal-UIv2.md`).
 * Portal-specific layering (search/topbar surface, hover surface) follows the
 * portal review feedback. Markdown spec wins where both define a value.
 * ========================================================================== */

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1440px' },
    },
    extend: {
      // ─────────────────────────────────────────────────────────────────────
      // COLORS
      // ─────────────────────────────────────────────────────────────────────
      colors: {
        // === Surface ====================================================
        // Layered backgrounds. Hierarchy (dark mode):
        //   background  → deepest page bg          #0a0a0a
        //   card        → topbar, cards            #0d1f15
        //   card-alt    → neutral (non-themed)     #111111
        //   accent      → hover / active surface   #1f241f
        // ----------------------------------------------------------------
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          alt: 'hsl(var(--card-alt))',
        },

        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },

        // shadcn convention: `accent` doubles as the unified HOVER surface.
        // All interactive hovers (nav, menu items, list rows) should land
        // here so hover feels consistent across the app.
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },

        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },

        // === Border / Form ==============================================
        border: 'hsl(var(--border))',          // subtle, the default
        'border-neutral': 'hsl(var(--border-neutral))', // non-themed dividers
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // === Brand ======================================================
        // 50–900 ramp is for marketing surfaces and gradients.
        // `bright` is the active/hover accent used in the Marketplace spec.
        // Day-to-day UI should reach for `primary` (DEFAULT) and only opt
        // into `bright` for the hover/active state.
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          bright: 'hsl(var(--primary-bright))',
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
        },

        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },

        // === Semantic (status) ==========================================
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          soft: 'hsl(var(--success-soft))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },

        // === Sidebar ====================================================
        // In dark mode the sidebar is pure black (#000) with white text.
        // It does NOT inherit the page surface — it is its own visual zone.
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },

        // === Charts =====================================================
        // Five categorical slots used by recharts. Light = multi-color
        // (per Figma), dark = monochromatic green ramp.
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      // ─────────────────────────────────────────────────────────────────────
      // TEXT COLORS (extension only — does NOT add bg-* / border-* siblings)
      // ─────────────────────────────────────────────────────────────────────
      // `text-tertiary` is the Marketplace spec's caption / metadata color.
      // Lives in `textColor` so it can't accidentally be used as a surface.
      textColor: {
        tertiary: 'hsl(var(--text-tertiary))',
      },

      // ─────────────────────────────────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────────────────────────────────
      // Font stack reads the CSS variable set by `next/font/google` Inter
      // in `app/layout.tsx`. Falls back to system sans for SSR / no-JS.
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },

      // Type scale — see Marketplace MVP spec §2 for canonical values.
      // The `display-*` variants are reserved for marketing surfaces.
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],            // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }],        // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],           // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }],        // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],         // 20px
        '2xl': ['1.5rem', { lineHeight: '1.75rem' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],     // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],       // 36px
        // Display (marketing) — match spec §2 exactly
        'display-sm': ['1.25rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0' }],         // H4 20/600
        'display-md': ['2rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],      // H3 32/600
        'display-lg': ['3rem', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }],     // H2 48/700
        'display-xl': ['4.5rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],    // H1 72/700
      },

      // ─────────────────────────────────────────────────────────────────────
      // SPACING / SIZING
      // ─────────────────────────────────────────────────────────────────────
      // Tailwind's default 4-px scale already covers the Marketplace spec
      // (4·8·12·16·24·32·40·56·80·120 → spacing 1·2·3·4·6·8·10·14·20·30).
      // The values below are domain-specific tokens we don't get for free.
      spacing: {
        'header-row': '48px',  // AG Grid header row height (Figma)
        'data-row': '42px',    // AG Grid data row height (Figma)
      },

      // ─────────────────────────────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────────────────────────────
      // `lg/md/sm` derive from `--radius` so a single CSS-var change
      // re-tunes the entire app. `card` matches Figma's 10-px portal cards.
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        card: '10px',
      },

      // ─────────────────────────────────────────────────────────────────────
      // SHADOWS
      // ─────────────────────────────────────────────────────────────────────
      // Light-mode subtle elevation. Dark mode should generally avoid shadow
      // (per spec §7: "No drop shadows on cards or surfaces") and rely on
      // borders for separation.
      boxShadow: {
        xs: '0 1px 2px 0 rgb(16 24 40 / 0.05)',
        sm: '0 1px 3px 0 rgb(16 24 40 / 0.06), 0 1px 2px -1px rgb(16 24 40 / 0.06)',
        md: '0 4px 8px -2px rgb(16 24 40 / 0.08), 0 2px 4px -2px rgb(16 24 40 / 0.04)',
        lg: '0 12px 16px -4px rgb(16 24 40 / 0.06), 0 4px 6px -2px rgb(16 24 40 / 0.03)',
        card: '0 1px 2px 0 rgb(24 29 31 / 0.06), 0 0 0 1px rgb(24 29 31 / 0.04)',
      },

      // ─────────────────────────────────────────────────────────────────────
      // MOTION
      // ─────────────────────────────────────────────────────────────────────
      // Marketplace spec §5: 200ms ease for all default hovers.
      transitionDuration: {
        DEFAULT: '200ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
