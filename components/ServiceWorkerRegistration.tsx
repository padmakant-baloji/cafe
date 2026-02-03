'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Temporarily disabled service worker to prevent crashes
    // if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    //   const handleLoad = () => {
    //     navigator.serviceWorker
    //       .register('/sw.js')
    //       .then((registration) => {
    //         console.log('Service Worker registered successfully:', registration.scope)
    //       })
    //       .catch((error) => {
    //         console.log('Service Worker registration failed:', error)
    //       })
    //   }

    //   // Use once option to prevent multiple registrations
    //   if (document.readyState === 'complete') {
    //     handleLoad()
    //   } else {
    //     window.addEventListener('load', handleLoad, { once: true })
    //   }

    //   return () => {
    //     window.removeEventListener('load', handleLoad)
    //   }
    // }
  }, [])

  return null
}
