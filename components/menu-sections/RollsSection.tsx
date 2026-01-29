'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

const items = [
  { name: 'Kolkata Style Veg Roll', desc: 'Spiced filling in soft roti', icon: 'kolkata-roll', spicy: true },
  { name: 'Crispy Spring Roll', desc: 'Golden fried rolls', icon: 'spring-roll', crispy: true },
  { name: "Baloji's Special Roll", desc: 'Loaded with sauces and crunch', icon: 'special-roll', special: true, loaded: true },
]

export default function RollsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    
    if (!sectionRef.current || !titleRef.current || !itemsRef.current) return

    // Set initial visible state
    gsap.set([titleRef.current, itemsRef.current.children], { opacity: 1, visibility: 'visible' })

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: isMobile ? 18 : 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Layered reveal (stacked cards effect) - reduce distance by 40% on mobile
      if (itemsRef.current) {
        gsap.fromTo(itemsRef.current.children,
          { opacity: 0, y: isMobile ? 36 : 60, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
      
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-neutral-cream"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🌯 Rolls
        </h2>

        <div ref={itemsRef} className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-2xl p-8 shadow-xl border border-neutral-gray/30 hover:border-gold hover:shadow-2xl transition-all duration-300 cursor-pointer md:ml-[20px] md:mr-[20px]"
              style={{
                zIndex: items.length - index,
                marginLeft: `clamp(0px, ${index * 1.25}vw, ${index * 20}px)`,
                marginRight: `clamp(0px, ${(items.length - 1 - index) * 1.25}vw, ${(items.length - 1 - index) * 20}px)`,
              }}
            >
              <div className="flex items-center gap-4">
                <FoodIcon type={item.icon} className="text-4xl group-hover:scale-125 transition-transform duration-300" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-blue-dark/70">{item.desc}</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {item.spicy && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">🌶️</span>}
                  {item.crispy && <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">✨</span>}
                  {item.special && <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold">⭐</span>}
                  {item.loaded && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">🔥</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
