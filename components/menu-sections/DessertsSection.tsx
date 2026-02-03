'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import TagBadge from '@/components/TagBadge'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.desserts

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
              className="group bg-neutral-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-8 shadow-2xl border border-gold/30 hover:border-gold transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  overlayIcon="🍰"
                  className="mb-4"
                />

                <div className="flex items-center justify-center mb-3">
                  <FoodIcon type={item.icon} className="text-5xl md:text-6xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg md:text-xl font-bold text-blue-dark group-hover:text-gold transition-colors flex-1 text-center">
                    {item.name}
                  </h3>
                  <span className="text-lg md:text-xl font-bold text-gold whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {item.desc && <p className="text-sm md:text-base text-blue-dark/70 text-center mb-2">{item.desc}</p>}
                {('options' in item && item.options && formatOptions(item.options).length > 0) ? (
                  <div className="flex flex-wrap gap-1.5 mb-3 justify-center">
                    {formatOptions(item.options).map((opt, optIdx) => (
                      <span key={optIdx} className="px-2 py-0.5 bg-blue-dark/10 text-blue-dark rounded-full text-xs font-medium">
                        {opt.name}
                        {opt.extra !== null && opt.extra !== undefined && (
                          <span className="ml-1 text-gold">+₹{opt.extra}</span>
                        )}
                      </span>
                    ))}
                  </div>
                ) : null}
                
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-auto flex justify-center gap-2 flex-wrap">
                    {item.tags.map((tag: string, tagIdx: number) => (
                      <TagBadge key={tagIdx} tag={tag} className="px-3 py-1" />
                    ))}
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
