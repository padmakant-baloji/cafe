'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

registerGSAP()

const items = [
  { name: 'Creamy Alfredo Pasta', desc: 'Rich white sauce pasta', icon: 'pasta-alfredo', creamy: true },
  { name: 'Arrabiata Fusion Pasta', desc: 'Tangy mildly spicy tomato sauce', icon: 'pasta-arrabiata', spicy: true, tangy: true },
]

export default function PastaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      // Gentle zoom-in
      gsap.from(itemsRef.current?.children || [], {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemsRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-br from-neutral-light via-white to-neutral-cream"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍝 Pasta
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/90 rounded-3xl p-8 shadow-lg border border-neutral-gray/20 hover:border-gold hover:shadow-2xl transition-all duration-300 cursor-pointer text-center"
              style={{
                borderRadius: '2rem',
              }}
            >
              <div className="mb-4">
                <FoodIcon type={item.icon} className="text-5xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-blue-dark/70 mb-4">{item.desc}</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {item.creamy && <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">🥛 Creamy</span>}
                {item.spicy && <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">🌶️ Spicy</span>}
                {item.tangy && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">🍋 Tangy</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
