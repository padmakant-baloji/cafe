'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

const items = [
  { name: 'Crispy Gobi Manchurian', options: ['Manchurian', 'Chilli', 'Salt & Pepper'], icon: 'gobi-manchurian', popular: true },
  { name: 'Golden Paneer Bites', desc: 'Crispy paneer in bold sauces', icon: 'paneer-bites', crispy: true },
  { name: 'Veggie Manchurian Pops', desc: 'Indo-Chinese favorite', icon: 'manchurian-pops', popular: true },
  { name: 'Corn Crunch Basket', desc: 'Fried golden corn', icon: 'corn-crunch', crispy: true },
  { name: 'American Butter Corn', desc: 'Butter tossed sweet corn', icon: 'butter-corn', buttery: true },
  { name: 'Cheesy Corn Balls', desc: 'Crunchy outside, gooey inside', icon: 'corn-balls', cheesy: true },
  { name: 'French Fries Trio', options: ['Salted', 'Masala', 'Peri-Peri'], icon: 'fries', trio: true },
  { name: 'Spiced Potato Wedges', desc: 'Crispy seasoned wedges', icon: 'potato-wedges', spicy: true },
  { name: 'Smiley Fries', desc: 'Fun crispy potato snacks', icon: 'smiley-fries', fun: true },
  { name: 'Veg Nuggets', desc: 'Golden fried veggie nuggets', icon: 'nuggets', crispy: true },
]

export default function QuickBitesSection() {
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
        { opacity: 0, y: 30 },
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

      // Staggered pop-in on scroll
      gsap.fromTo(itemsRef.current.children,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
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
          🍟 Quick Bites
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, rotate: 1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-xl p-5 shadow-lg border-2 border-gold/30 hover:border-gold hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <FoodIcon type={item.icon} className="text-3xl group-hover:scale-125 transition-transform duration-300" />
                  <h3 className="text-base font-bold text-blue-dark group-hover:text-gold transition-colors flex-1">
                    {item.name}
                  </h3>
                  {item.popular && (
                    <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">
                      HOT
                    </span>
                  )}
                </div>
                
                {item.options ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.options.map((opt, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/60 rounded-full text-xs text-blue-dark font-medium">
                        {opt}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-blue-dark/70 mt-1">{item.desc}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
