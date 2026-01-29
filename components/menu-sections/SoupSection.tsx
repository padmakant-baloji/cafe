'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

const items = [
  { name: 'Classic Manchow Soup', desc: 'Spicy Indo-Chinese soup with crunchy garlic', icon: 'soup-manchow', spicy: true },
  { name: 'Garden Fresh Tomato Soup', desc: 'Slow-cooked tomatoes with herbs', icon: 'soup-tomato', fresh: true },
  { name: 'Creamy Mushroom Delight', desc: 'Rich and creamy mushroom soup', icon: 'soup-mushroom', creamy: true },
  { name: 'Roasted Garlic Soup', desc: 'Aromatic garlic broth', icon: 'soup-garlic', aromatic: true },
]

export default function SoupSection() {
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
      // Title animation - reduce distance by 40% on mobile
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

      // Items fade + slow upward motion - reduce distance by 40% on mobile
      gsap.fromTo(itemsRef.current.children,
        { opacity: 0, y: isMobile ? 24 : 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
      
      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FAFAFA, #F5F5F5)',
      }}
    >
      {/* Steam overlay effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍲 Soups
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-neutral-gray/20 hover:shadow-2xl hover:border-green/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Steam effect on hover */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 left-1/4 w-16 h-16 bg-green/20 rounded-full blur-2xl animate-pulse" />
                <div className="absolute top-4 right-1/4 w-20 h-20 bg-green/15 rounded-full blur-3xl animate-pulse delay-150" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  <FoodIcon type={item.icon} className="text-4xl group-hover:scale-125 transition-transform duration-300" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-dark mb-1 group-hover:text-green transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-blue-dark/70">{item.desc}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  {item.spicy && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                      🌶️ Spicy
                    </span>
                  )}
                  {item.fresh && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      🥬 Fresh
                    </span>
                  )}
                  {item.creamy && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      🥛 Creamy
                    </span>
                  )}
                  {item.aromatic && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                      🌿 Aromatic
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
