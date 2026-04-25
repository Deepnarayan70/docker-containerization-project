import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Startup Funding Tracker',
  description: 'Track startups that got funding - powered by Firecrawl',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
