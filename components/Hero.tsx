'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import Logo from '@/components/Logo'

export default function Hero() {
  const taglineRef = useRef<HTMLDivElement>(null)
  const steamRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const handleExploreClick = () => {
    if (typeof document === 'undefined') return

    const menuSection = document.getElementById('menu')
    if (!menuSection) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    menuSection.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    
    // Set initial visible state for all elements
    if (taglineRef.current) {
      gsap.set(taglineRef.current, { opacity: 1, visibility: 'visible' })
    }
    if (ctaRef.current) {
      gsap.set(ctaRef.current.children, { opacity: 1, visibility: 'visible' })
    }
    
    if (prefersReducedMotion) return

    // Animate logo fade in
    if (taglineRef.current) {
      gsap.fromTo(taglineRef.current,
        { opacity: 0, scale: 0.9, y: isMobile ? 20 : 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        }
      )
    }

    // Coffee steam animation - reduce distance by 40% on mobile
    if (steamRef.current) {
      const steamElements = steamRef.current.querySelectorAll('.steam')
      const steamDistance = isMobile ? -60 : -100
      steamElements.forEach((steam, index) => {
        gsap.to(steam, {
          y: steamDistance,
          opacity: 0,
          duration: 2 + index * 0.3,
          repeat: -1,
          ease: 'power1.out',
          delay: index * 0.5,
        })
      })
    }

    // Floating icons animation - reduce distance by 40% on mobile
    if (iconsRef.current) {
      const icons = iconsRef.current.querySelectorAll('.floating-icon')
      const floatDistance = isMobile ? -18 : -30
      icons.forEach((icon, index) => {
        gsap.to(icon, {
          y: floatDistance,
          rotation: isMobile ? 3 : 5,
          duration: 2 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.3,
        })
      })
    }

    // CTA fade in - reduce distance by 40% on mobile
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current.children,
        { opacity: 0, y: isMobile ? 12 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          delay: 1.5,
        }
      )
    }
  }, [])

  const foodIcons = ['🍲', '🍕', '🍔', '🥟', '☕']

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-white via-neutral-cream to-neutral-light">
      {/* Background floating icons */}
      <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
        {foodIcons.map((icon, index) => (
          <div
            key={index}
            className="floating-icon absolute text-6xl md:text-8xl opacity-10"
            style={{
              left: `${15 + index * 20}%`,
              top: `${20 + (index % 2) * 40}%`,
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Coffee steam animation */}
      <div ref={steamRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="steam absolute w-2 h-20 bg-gradient-to-t from-green-dark/30 to-transparent rounded-full"
            style={{
              left: `${-20 + i * 20}px`,
              bottom: '0',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo */}
        <div ref={taglineRef} className="mb-8">
          <Logo showText={true} />
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(30, 58, 95, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExploreClick}
            className="px-8 py-4 bg-blue-dark text-neutral-white rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
          >
            Explore Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(251, 191, 36, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gold text-blue-dark rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
          >
            Order Now
          </motion.button>
        </div>
      </div>
    </section>
  )
}
