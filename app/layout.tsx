import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GroScale — Design System POC',
  description: 'Logistics platform connecting shippers and carriers.',
}

// Synchronously apply the saved dark-mode colorway class to <html> before
// React hydrates, so we never flash the default palette. Mirrors the pattern
// next-themes uses for light/dark.
const colorwayBootScript = `(function(){try{var c=localStorage.getItem('groscale-colorway');if(c==='colorway-1'||c==='colorway-2'||c==='colorway-3'){document.documentElement.classList.add(c);}else{document.documentElement.classList.add('colorway-1');}}catch(e){document.documentElement.classList.add('colorway-1');}})();`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: colorwayBootScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
