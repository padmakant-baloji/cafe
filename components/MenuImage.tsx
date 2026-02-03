'use client'

import { useState } from 'react'

interface MenuImageProps {
  src: string
  alt: string
  className?: string
  overlayIcon?: string
}

export default function MenuImage({ src, alt, className = '', overlayIcon }: MenuImageProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-dark/80 via-blue-dark/60 to-gold/60 aspect-[4/3] ${className}`}
    >
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      )}

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

      {overlayIcon && (
        <div className="absolute bottom-3 right-3 text-3xl drop-shadow-md">
          {overlayIcon}
        </div>
      )}
    </div>
  )
}


