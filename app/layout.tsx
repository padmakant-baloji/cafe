import type { Metadata } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
})

export const metadata: Metadata = {
  title: "Baloji's Cafe - EAT • SIP • REPEAT",
  description: 'Premium café experience with award-winning menu items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
