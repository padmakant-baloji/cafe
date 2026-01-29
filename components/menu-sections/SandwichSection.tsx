'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

registerGSAP()

const items = [
  { name: 'Grilled Veg Sandwich', desc: 'Butter grilled veggies', icon: 'sandwich-grilled', grilled: true },
  { name: 'Paneer Tikka Sandwich', desc: 'Smoky paneer filling', icon: 'sandwich-paneer', smoky: true },
  { name: 'Classic Veg Sandwich', desc: 'Simple and tasty', icon: 'sandwich-veg', classic: true },
  { name: 'Bombay Masala Sandwich', desc: 'Street-style layered sandwich', icon: 'sandwich-bombay', spicy: true },
  { name: "Baloji's Special Sandwich", desc: 'Loaded and cheesy', icon: 'sandwich-special', special: true, cheesy: true },
]

export default function SandwichSection() {
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

      // Fade + slight lift
      gsap.from(itemsRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
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
      className="py-24 px-4 md:px-8 bg-white"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🥪 Sandwiches
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-neutral-light rounded-xl p-6 shadow-md border border-neutral-gray/30 hover:border-blue hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-4"
            >
              <FoodIcon type={item.icon} className="text-3xl group-hover:scale-125 transition-transform duration-300" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-blue-dark mb-1 group-hover:text-blue transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-blue-dark/70">{item.desc}</p>
              </div>
              <div className="flex gap-1 flex-wrap">
                {item.grilled && <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">🔥</span>}
                {item.smoky && <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">💨</span>}
                {item.classic && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">⭐</span>}
                {item.spicy && <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">🌶️</span>}
                {item.special && <span className="px-2 py-0.5 bg-gold/20 text-gold rounded-full text-xs">✨</span>}
                {item.cheesy && <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">🧀</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
