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

  // Get basePath from environment (for GitHub Pages deployment)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  // For local images, always load immediately (important for static export)
  // For external images, use lazy loading with Intersection Observer
  const isLocalImage = src && src.startsWith('/')
  
  // Prepend basePath to local image paths for correct deployment
  const imageSrc = isLocalImage ? `${basePath}${src}` : src

  useEffect(() => {
    // Reset error state when src changes
    setHasError(false)
    
    // For local images, we render them directly, no need to set state
    // For external images, use lazy loading with Intersection Observer
    if (isLocalImage) {
      return
    }

    // Use Intersection Observer to only load external images when visible
    if (!imgRef.current || !src) return

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
  }, [src, isLocalImage])

  // Ensure src is valid
  if (!src) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-dark/80 via-blue-dark/60 to-gold/60 aspect-[4/3] ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-blue-dark/50">
          No image
        </div>
      </div>
    )
  }

  return (
    <div
      ref={imgRef}
      className={`relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-dark/80 via-blue-dark/60 to-gold/60 aspect-[4/3] ${className}`}
    >
      {/* Always render local images directly for static export compatibility */}
      {isLocalImage && !hasError && (
        <img
          src={imageSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            setHasError(true)
          }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
      {/* Lazy load external images */}
      {!isLocalImage && shouldLoad && !hasError && (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => {
            setHasError(true)
          }}
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


