'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import TagBadge from '@/components/TagBadge'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.quickBites

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
      if (itemsRef.current) {
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
      }
      
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

        <div ref={itemsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08, rotate: 1, y: -8 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-br from-gold/20 to-gold-light/10 rounded-2xl p-4 md:p-5 shadow-lg border-2 border-gold/30 hover:border-gold hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <div className="relative z-10 flex flex-col h-full">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  overlayIcon="🍟"
                  className="mb-3"
                />

                <div className="flex items-center gap-3 mb-2">
                  <FoodIcon type={item.icon} className="text-2xl md:text-3xl group-hover:scale-125 transition-transform duration-300" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm md:text-base font-bold text-blue-dark group-hover:text-gold transition-colors">
                        {item.name}
                      </h3>
                      {item.tags && item.tags.includes('popular') && (
                        <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold animate-pulse">
                          HOT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      {item.desc && (
                        <p className="text-xs text-blue-dark/70">{item.desc}</p>
                      )}
                      <span className="text-sm md:text-base font-bold text-gold whitespace-nowrap ml-2">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {'options' in item && item.options && formatOptions(item.options as any).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {formatOptions(item.options as any).map((opt, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/60 rounded-full text-xs text-blue-dark font-medium">
                        {opt.name}
                        {opt.extra !== null && opt.extra !== undefined && (
                          <span className="ml-1 text-gold">+₹{opt.extra}</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags
                      .filter((tag: string) => tag !== 'popular') // popular is shown as HOT badge above
                      .map((tag: string, tagIdx: number) => (
                        <TagBadge key={tagIdx} tag={tag} className="px-2 py-0.5" />
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
