'use client'

import { useState, useEffect, useRef } from 'react'

interface MenuImageProps {
  src: string
  alt: string
  className?: string
  overlayIcon?: string
}

export default function MenuImage({ src, alt, className = '', overlayIcon }: MenuImageProps) {
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Use Intersection Observer to only load images when visible
    if (!imgRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { 
        rootMargin: '100px', // Load slightly before visible
        threshold: 0.1 
      }
    )

    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={imgRef}
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-dark/80 via-blue-dark/60 to-gold/60 aspect-[4/3] ${className}`}
    >
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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


