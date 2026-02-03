'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.momos

export default function MomosSection() {
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

      if (itemsRef.current) {
        gsap.fromTo(itemsRef.current.children,
          { opacity: 0, scale: 0.9, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
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
      className="py-24 px-4 md:px-8 bg-gradient-to-br from-neutral-cream to-neutral-light"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🥟 Momos
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white rounded-3xl p-8 shadow-lg border-2 border-green/30 hover:border-green hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Steam effect on hover */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-green/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              <div className="absolute top-4 left-1/3 w-24 h-24 bg-green/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
              <div className="absolute top-6 right-1/3 w-20 h-20 bg-green/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200" />
              
              <div className="relative z-10 text-center">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  overlayIcon="🥟"
                  className="mb-4"
                />
                <div className="mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  <FoodIcon type={item.icon} className="text-6xl" />
                </div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-blue-dark group-hover:text-green transition-colors flex-1">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-gold whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {'options' in item && item.options && formatOptions(item.options).length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {formatOptions(item.options).map((opt, i) => (
                      <span key={i} className="px-3 py-1.5 bg-green/10 hover:bg-green/20 text-green-700 rounded-full text-sm font-semibold transition-colors">
                        {opt.name}
                        {opt.extra !== null && opt.extra !== undefined && (
                          <span className="ml-1 text-gold">+₹{opt.extra}</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {item.popular && (
                  <div className="mt-4">
                    <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">
                      🔥 Popular
                    </span>
                  </div>
                )}
                {item.cheesy && (
                  <div className="mt-4">
                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                      🧀 Cheesy
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
