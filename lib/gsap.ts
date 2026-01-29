import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGSAP() {
  if (typeof window !== 'undefined' && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
    
    // Refresh ScrollTrigger after a short delay to ensure DOM is ready
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      
      // Also refresh on window load
      window.addEventListener('load', () => {
        ScrollTrigger.refresh()
      })
    }
  }
}

export { gsap, ScrollTrigger }
