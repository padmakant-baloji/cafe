import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import './globals.css'
import PWAInstaller from '@/components/PWAInstaller'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Baloji's Cafe - EAT • SIP • REPEAT",
    template: "%s | Baloji's Cafe",
  },
  description: 'Premium café experience with award-winning menu items',
  keywords: ['cafe', 'restaurant', 'food', 'menu', 'dining', 'coffee', 'vegetarian'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Baloji's Cafe",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: "Baloji's Cafe",
    title: "Baloji's Cafe - EAT • SIP • REPEAT",
    description: 'Premium café experience with award-winning menu items',
  },
  twitter: {
    card: 'summary',
    title: "Baloji's Cafe",
    description: 'Premium café experience with award-winning menu items',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E3A5F' },
    { media: '(prefers-color-scheme: dark)', color: '#1E3A5F' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Baloji's Cafe" />
        <meta name="application-name" content="Baloji's Cafe" />
        <meta name="msapplication-TileColor" content="#1E3A5F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
        <PWAInstaller />
        <ServiceWorkerRegistration />
      </body>
    </html>
  )
}
