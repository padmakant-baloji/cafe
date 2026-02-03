'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return
    }

    // Listen for beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10)
      const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissed < 7) {
        setShowInstallPrompt(false)
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setShowInstallPrompt(false)
    } else {
      localStorage.setItem('pwa-install-dismissed', Date.now().toString())
      setShowInstallPrompt(false)
    }

    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
    setShowInstallPrompt(false)
  }

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 safe-bottom"
        >
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gold p-4 flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-dark to-gold rounded-xl flex items-center justify-center">
                <span className="text-2xl">☕</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-dark text-sm">Install Baloji's Cafe</h3>
              <p className="text-xs text-blue-dark/70">Add to home screen for quick access</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="min-h-[44px] min-w-[44px] px-4 py-2 bg-gold text-blue-dark rounded-full text-xs font-semibold hover:bg-gold/90 active:bg-gold/80 transition-colors touch-manipulation"
                aria-label="Install app"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="min-h-[44px] min-w-[44px] px-3 py-2 text-blue-dark/70 hover:text-blue-dark active:text-blue-dark transition-colors touch-manipulation"
                aria-label="Dismiss install prompt"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
