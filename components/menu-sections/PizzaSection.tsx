'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

const items = [
  { name: 'Classic Margherita', desc: 'Cheese and tomato classic', icon: 'pizza-margherita', classic: true },
  { name: 'American Queen', desc: 'Loaded veggie pizza', icon: 'pizza-queen', loaded: true },
  { name: 'Farmhouse Feast', desc: 'Fresh farm vegetables', icon: 'pizza-farmhouse', fresh: true },
  { name: 'Paneer Tikka Pizza', desc: 'Indian flavored paneer topping', icon: 'pizza-paneer', spicy: true },
  { name: 'Pepperoni Style Veg', desc: 'Spicy veg pepperoni', icon: 'pizza-pepperoni', spicy: true },
  { name: 'Corn & Cheese Delight', desc: 'Sweet corn and cheese', icon: 'pizza-corn', cheesy: true },
]

export default function PizzaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (!sectionRef.current || !titleRef.current || !itemsRef.current) return

    // Set initial visible state
    gsap.set([titleRef.current, itemsRef.current.children], { opacity: 1, visibility: 'visible' })

    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Slow scale animation
      gsap.fromTo(itemsRef.current.children,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
      
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍕 Pizzas
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 2, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-br from-gold/30 to-gold-light/20 rounded-2xl p-6 shadow-xl border-2 border-gold/40 hover:border-gold hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Cheese pull effect */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-yellow-300/30 rounded-full blur-3xl animate-pulse" />
              </div>
              
              <div className="relative z-10 text-center">
                <div className="mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  <FoodIcon type={item.icon} className="text-5xl" />
                </div>
                <h3 className="text-lg font-bold text-blue-dark mb-2 group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-blue-dark/70 mb-3">{item.desc}</p>
                
                <div className="flex justify-center gap-2 flex-wrap">
                  {item.classic && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Classic</span>}
                  {item.loaded && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">Loaded</span>}
                  {item.fresh && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Fresh</span>}
                  {item.spicy && <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">🌶️ Spicy</span>}
                  {item.cheesy && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">🧀 Cheesy</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
