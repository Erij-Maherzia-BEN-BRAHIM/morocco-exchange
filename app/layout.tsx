import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import RatesMarquee from "@/components/rates-marquee"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Morocco Exchange Rates",
  description: "Track currency exchange rates in Morocco",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <RatesMarquee />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-4">
                <div className="container mx-auto text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Morocco Exchange Rates. All rights reserved.
                </div>
              </footer>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'