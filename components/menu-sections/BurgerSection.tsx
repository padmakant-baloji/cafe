'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

registerGSAP()

const items = [
  { name: 'Classic Veg Burger', desc: 'Crispy patty with fresh veggies', icon: 'burger-veg', classic: true },
  { name: 'Paneer Crunch Burger', desc: 'Spiced paneer patty', icon: 'burger-paneer', crispy: true, spicy: true },
  { name: 'Double Decker Burger', desc: 'Two patties, extra indulgent', icon: 'burger-double', double: true, popular: true },
]

export default function BurgerSection() {
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
        y: isMobile ? 18 : 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
      })

      // Subtle weighty drop-in - reduce distance by 40% on mobile
      gsap.from(itemsRef.current?.children || [], {
        opacity: 0,
        y: isMobile ? 48 : 80,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
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
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-neutral-gray to-neutral-cream"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍔 Burgers
        </h2>

        <div ref={itemsRef} className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-2xl p-8 shadow-2xl border-4 border-blue-dark/20 hover:border-blue-dark hover:shadow-[0_25px_50px_rgba(30,58,95,0.3)] transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{
                boxShadow: '0 20px 40px rgba(30, 58, 95, 0.2)',
              }}
            >
              {/* Weighty shadow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <FoodIcon type={item.icon} className="text-6xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-blue-dark text-center mb-2 group-hover:text-blue transition-colors">
                  {item.name}
                </h3>
                <p className="text-base text-blue-dark/70 text-center mb-4">{item.desc}</p>
                
                <div className="flex justify-center gap-2 flex-wrap">
                  {item.classic && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">Classic</span>}
                  {item.crispy && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">Crispy</span>}
                  {item.spicy && <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">🌶️ Spicy</span>}
                  {item.double && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">Double</span>}
                  {item.popular && <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse">🔥 Popular</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
