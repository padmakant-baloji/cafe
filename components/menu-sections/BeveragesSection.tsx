'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'
import MenuImage from '@/components/MenuImage'
import menuData from '@/data/menu.json'
import { formatPrice, formatOptions } from '@/lib/menuUtils'

const items = menuData.beverages

export default function BeveragesSection() {
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

      // Gentle fade
      if (itemsRef.current) {
        gsap.fromTo(itemsRef.current.children,
          { opacity: 0 },
          {
            opacity: 1,
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
      className="py-24 px-4 md:px-8 bg-white"
      style={{
        background: 'linear-gradient(to bottom, #FAFAFA, #F5F5F5)',
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-serif font-bold text-blue-dark mb-16 text-center"
        >
          ☕ Beverages
        </h2>

        <div ref={itemsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-neutral-light rounded-2xl p-8 shadow-sm border border-neutral-gray/20 hover:border-blue hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
            >
              <MenuImage
                src={item.image}
                alt={item.name}
                overlayIcon="☕"
                className="mb-4"
              />
              <div className="mb-4">
                <FoodIcon type={item.icon} className="text-5xl group-hover:scale-125 transition-transform duration-300" />
              </div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-blue-dark group-hover:text-blue transition-colors">
                  {item.name}
                </h3>
                <span className="text-lg font-bold text-gold whitespace-nowrap">
                  {formatPrice(item.price)}
                </span>
              </div>
              {item.desc && <p className="text-sm text-blue-dark/70 mb-2">{item.desc}</p>}
              {'options' in item && item.options && formatOptions(item.options).length > 0 && (
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {formatOptions(item.options).map((opt, optIdx) => (
                    <span key={optIdx} className="px-2 py-0.5 bg-blue-dark/10 text-blue-dark rounded-full text-xs font-medium">
                      {opt.name}
                      {opt.extra !== null && opt.extra !== undefined && (
                        <span className="ml-1 text-gold">+₹{opt.extra}</span>
                      )}
                    </span>
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
