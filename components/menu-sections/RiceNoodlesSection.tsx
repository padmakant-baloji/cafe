'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

registerGSAP()

const items = [
  { name: 'Schezwan Fire Rice / Noodles', desc: 'Spicy and smoky', icon: 'schezwan-rice', spicy: true },
  { name: 'Chilli Garlic Rice / Noodles', desc: 'Garlic-forward street style', icon: 'chilli-garlic-rice', spicy: true },
  { name: 'Classic Veg Fried Rice / Noodles', desc: 'Light and comforting', icon: 'fried-rice', classic: true },
  { name: "Baloji's Special Fried Rice / Noodles", desc: "Chef's special", icon: 'fried-rice', special: true },
  { name: 'Hakka Noodles', desc: 'Classic Indo-Chinese style', icon: 'hakka-noodles', classic: true },
]

export default function RiceNoodlesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        x: isMobile ? -30 : -50,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      // Slide-in from sides (alternating) - reduce distance by 40% on mobile
      const children = Array.from(itemsRef.current?.children || [])
      children.forEach((child, index) => {
        const fromX = index % 2 === 0 ? (isMobile ? -60 : -100) : (isMobile ? 60 : 100)
        gsap.from(child, {
          opacity: 0,
          x: fromX,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: child,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-r from-neutral-cream to-neutral-light"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍚 Rice & Noodles
        </h2>

        <div ref={itemsRef} className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/80 rounded-xl p-6 shadow-md border-l-4 border-green hover:border-green hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-4"
            >
              <FoodIcon type={item.icon} className="text-3xl group-hover:scale-125 transition-transform duration-300" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-dark mb-1 group-hover:text-green transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-blue-dark/70">{item.desc}</p>
              </div>
              <div className="flex gap-2">
                {item.spicy && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">🌶️</span>}
                {item.classic && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">⭐</span>}
                {item.special && <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold">✨</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
