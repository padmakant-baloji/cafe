'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import TagBadge from '@/components/TagBadge'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.pasta

export default function PastaSection() {
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
            once: true,
            markers: false,
          },
        }
      )

      // Items fade + slow upward motion - reduce distance by 40% on mobile
      if (itemsRef.current) {
        gsap.fromTo(itemsRef.current.children,
          { opacity: 0, y: isMobile ? 48 : 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
              once: true,
              markers: false,
            },
          }
        )
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => {
        if (sectionRef.current && sectionRef.current.contains(trigger.trigger as Node)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-8 bg-gradient-to-br from-neutral-light via-white to-neutral-cream"
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          🍝 Pasta
        </h2>

        <div ref={itemsRef} className="space-y-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-white rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-blue-dark/20 hover:border-blue-dark hover:shadow-[0_25px_50px_rgba(30,58,95,0.3)] transition-all duration-300 cursor-pointer relative overflow-hidden"
              style={{
                boxShadow: '0 20px 40px rgba(30, 58, 95, 0.2)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <MenuImage
                  src={item.image}
                  alt={item.name}
                  overlayIcon="🍝"
                  className="mb-4"
                />
                <div className="flex items-center justify-center gap-4 mb-4">
                  <FoodIcon type={item.icon} className="text-5xl md:text-6xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl md:text-2xl font-bold text-blue-dark group-hover:text-gold transition-colors flex-1 text-left">
                    {item.name}
                  </h3>
                  <span className="text-lg md:text-xl font-bold text-gold whitespace-nowrap text-right">
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
                  <div className="flex justify-center gap-2 flex-wrap">
                    {item.tags.map((tag: string, tagIdx: number) => (
                      <TagBadge key={tagIdx} tag={tag} className="px-3 py-1 text-sm" />
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
