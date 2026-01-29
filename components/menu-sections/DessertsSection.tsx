'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

const items = [
  { name: 'Sizzling Brownie with Ice Cream', desc: 'Hot brownie with cold ice cream', icon: 'sizzling-brownie', hot: true, cold: true, popular: true },
  { name: 'Royal Shahi Tukda', desc: 'Rich Indian dessert', icon: 'shahi-tukda', royal: true, rich: true },
  { name: 'Dessert Noodles (Darshan Style)', desc: 'Crispy sweet noodles', icon: 'dessert-noodles', crispy: true, sweet: true },
  { name: 'Gulab Jamun with Ice Cream', desc: 'Warm and cold combo', icon: 'gulab-jamun', warm: true, cold: true },
]

export default function DessertsSection() {
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
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Slow reveal + glow
      if (itemsRef.current) {
        gsap.fromTo(itemsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
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
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-blue-dark to-blue"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-neutral-white mb-16 text-center"
        >
          🍰 Desserts
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8, boxShadow: '0 0 40px rgba(251, 191, 36, 0.6)' }}
              whileTap={{ scale: 0.98 }}
              className="group bg-neutral-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gold/30 hover:border-gold transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <FoodIcon type={item.icon} className="text-6xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-dark text-center mb-2 group-hover:text-gold transition-colors">
                  {item.name}
                </h3>
                <p className="text-base text-blue-dark/70 text-center mb-4">{item.desc}</p>
                
                <div className="flex justify-center gap-2 flex-wrap">
                  {item.hot && <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">🔥 Hot</span>}
                  {item.cold && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">❄️ Cold</span>}
                  {item.royal && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">👑 Royal</span>}
                  {item.rich && <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">💎 Rich</span>}
                  {item.crispy && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">✨ Crispy</span>}
                  {item.sweet && <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">🍬 Sweet</span>}
                  {item.warm && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">🌡️ Warm</span>}
                  {item.popular && <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">⭐ Popular</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
