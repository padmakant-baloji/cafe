'use client'

import Image from 'next/image'

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Logo Icon - Using image from public folder */}
      {/* <div className="relative mb-6 w-40 h-40 md:w-48 md:h-48">
        <Image
          src="/logo.png"
          alt="Baloji's Cafe Logo"
          fill
          className="drop-shadow-lg object-contain"
          priority
        />
      </div> */}
      
      {/* Logo Text */}
      {showText && (
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-3 mb-3">
            <span 
              className="text-5xl md:text-6xl text-gold" 
              style={{ 
                fontFamily: 'var(--font-script)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Baloji's
            </span>
            <span className="text-4xl md:text-5xl font-serif text-blue-dark font-semibold">
              Cafe
            </span>
          </div>
          <p 
            className="text-base md:text-lg font-sans uppercase tracking-widest text-green-dark font-semibold"
            style={{ letterSpacing: '0.15em' }}
          >
            EAT • SIP • REPEAT
          </p>
        </div>
      )}
    </div>
  )
}
