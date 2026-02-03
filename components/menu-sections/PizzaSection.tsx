'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import TagBadge from '@/components/TagBadge'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.pizzas

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
      if (itemsRef.current) {
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
          🍕 Pizzas
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 2, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-br from-gold/30 to-gold-light/20 rounded-2xl p-4 md:p-6 shadow-xl border-2 border-gold/40 hover:border-gold hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col"
            >
              {/* Cheese pull effect */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-yellow-300/30 rounded-full blur-3xl animate-pulse" />
              </div>
              
              <div className="relative z-10 text-center flex flex-col h-full">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  overlayIcon="🍕"
                  className="mb-3"
                />

                <div className="mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
                  <FoodIcon type={item.icon} className="text-4xl md:text-5xl" />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base md:text-lg font-bold text-blue-dark group-hover:text-gold transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-base md:text-lg font-bold text-gold whitespace-nowrap">
                    {formatPrice(item.price, { first: 'Small', second: 'Medium' })}
                  </span>
                </div>
                {item.desc && (
                  <p className="text-xs md:text-sm text-blue-dark/70 mb-2 px-2">
                    {item.desc}
                  </p>
                )}
                {('options' in item && item.options && formatOptions(item.options).length > 0) ? (
                  <div className="flex flex-wrap gap-1.5 mb-2 justify-center">
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
                      <TagBadge key={tagIdx} tag={tag} className="px-2 py-1" />
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
