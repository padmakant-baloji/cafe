'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import TagBadge from '@/components/TagBadge'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.riceNoodles

export default function RiceNoodlesSection() {
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
      gsap.fromTo(titleRef.current,
        { opacity: 0, x: isMobile ? -30 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Slide-in from sides (alternating) - reduce distance by 40% on mobile
      if (itemsRef.current) {
        const children = Array.from(itemsRef.current.children)
        children.forEach((child, index) => {
          const fromX = index % 2 === 0 ? (isMobile ? -60 : -100) : (isMobile ? 60 : 100)
          gsap.fromTo(child,
            { opacity: 0, x: fromX },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: child,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }
      
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-r from-neutral-cream to-neutral-light"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍚 Rice & Noodles
        </h2>

        <div ref={itemsRef} className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, x: index % 2 === 0 ? 5 : -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white/80 rounded-xl p-6 shadow-md border-l-4 border-green hover:border-green hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <MenuImage
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full"
                  />
                </div>
                <FoodIcon type={item.icon} className="text-3xl group-hover:scale-125 transition-transform duration-300" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold text-blue-dark group-hover:text-green transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-gold whitespace-nowrap">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  {item.desc && <p className="text-sm text-blue-dark/70 mb-2">{item.desc}</p>}
                  {('options' in item && item.options && formatOptions(item.options).length > 0) ? (
                    <div className="flex flex-wrap gap-1.5">
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
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-2">
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
