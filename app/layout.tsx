import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ka-Sillag Connect - ITRMC',
  description: 'Ilocos Training and Regional Medical Center Connect App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
