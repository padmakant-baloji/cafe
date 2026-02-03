import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false
let loadHandler: (() => void) | null = null
let refreshTimeout: NodeJS.Timeout | null = null

export function registerGSAP() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
    
    // Limit ScrollTrigger refresh to prevent performance issues
    const debouncedRefresh = () => {
      if (refreshTimeout) {
        clearTimeout(refreshTimeout)
      }
      refreshTimeout = setTimeout(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      }, 500) // Debounce to max once per 500ms
    }
    
    if (typeof window !== 'undefined') {
      // Initial refresh
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
      
      // Also refresh on window load (only once)
      loadHandler = debouncedRefresh
      window.addEventListener('load', loadHandler, { once: true })
    }
  }
}

export function cleanupGSAP() {
  if (typeof window !== 'undefined' && loadHandler) {
    window.removeEventListener('load', loadHandler)
    loadHandler = null
  }
}

export { gsap, ScrollTrigger }
