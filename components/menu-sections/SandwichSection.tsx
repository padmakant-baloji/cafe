'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import TagBadge from '@/components/TagBadge'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.sandwiches

export default function SandwichSection() {
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

      // Fade + slight lift
      if (itemsRef.current) {
        gsap.fromTo(itemsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
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
      <div className="max-w-5xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🥪 Sandwiches
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-neutral-light rounded-xl p-6 shadow-md border border-neutral-gray/30 hover:border-blue hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-4"
            >
              <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full"
                />
              </div>
              <FoodIcon type={item.icon} className="text-3xl group-hover:scale-125 transition-transform duration-300" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-blue-dark group-hover:text-blue transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-base font-bold text-gold whitespace-nowrap">
                    {formatPrice(item.price)}
                  </span>
                </div>
                {item.desc && <p className="text-sm text-blue-dark/70 mb-1">{item.desc}</p>}
                {('options' in item && item.options && formatOptions(item.options).length > 0) ? (
                  <div className="flex flex-wrap gap-1">
                    {formatOptions(item.options).map((opt, optIdx) => (
                      <span key={optIdx} className="px-1.5 py-0.5 bg-blue-dark/10 text-blue-dark rounded-full text-xs font-medium">
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
                <div className="flex gap-1 flex-wrap">
                  {item.tags.map((tag: string, tagIdx: number) => (
                    <TagBadge key={tagIdx} tag={tag} className="px-2 py-0.5" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
