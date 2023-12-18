'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Stone Currency</title>
        <meta
          name="description"
          content="Veja quantos reais voce irá gastar para comprar seus dolares"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
