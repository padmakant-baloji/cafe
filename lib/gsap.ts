import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
let loadHandler: (() => void) | null = null
let refreshTimeout: NodeJS.Timeout | null = null
let resizeTimeout: NodeJS.Timeout | null = null

export function registerGSAP() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
    
    // Optimize ScrollTrigger for better performance
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      ignoreMobileResize: true, // Prevent unnecessary refreshes on mobile
    })
    
    // Debounced refresh function to prevent performance issues
    const debouncedRefresh = () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout)
      }
      refreshTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }, 300) // Reduced to 300ms for better responsiveness
    }
    
    // Debounced resize handler
    const debouncedResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }, 250)
    }
    
    if (typeof window !== 'undefined') {
      // Initial refresh
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
      
      // Refresh on window load (only once)
      loadHandler = debouncedRefresh
      window.addEventListener('load', loadHandler, { once: true })
      
      // Handle resize with debounce
      window.addEventListener('resize', debouncedResize, { passive: true })
    }
  }
}

export function cleanupGSAP() {
  if (typeof window !== 'undefined') {
    if (loadHandler) {
      window.removeEventListener('load', loadHandler)
      loadHandler = null
    }
    if (refreshTimeout) {
      clearTimeout(refreshTimeout)
      refreshTimeout = null
    }
    if (resizeTimeout) {
      clearTimeout(resizeTimeout)
      resizeTimeout = null
    }
    // Kill all ScrollTrigger instances
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}

export { gsap, ScrollTrigger }
