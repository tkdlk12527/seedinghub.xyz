"use client"

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { usePathname } from "next/navigation"
import { StatsProvider } from "@/contexts/stats-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=4198813843741038&ev=PageView&noscript=1" />`,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StatsProvider>
            <div className="flex min-h-screen flex-col">
              {!isHomePage && <SiteHeader />}
              <main className="flex-1">{children}</main>
              {!isHomePage && <SiteFooter />}
            </div>
          </StatsProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '4198813843741038');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  )
}