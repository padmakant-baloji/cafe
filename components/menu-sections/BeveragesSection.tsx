'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'
import FoodIcon from '@/components/FoodIcon'

const items = [
  { name: 'Hot Coffee', desc: 'Freshly brewed', icon: 'coffee-hot' },
  { name: 'Cold Coffee', desc: 'Chilled and creamy', icon: 'coffee-cold' },
  { name: 'Masala Chai', desc: 'Traditional Indian tea', icon: 'chai' },
]

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
              <div className="mb-4">
                <FoodIcon type={item.icon} className="text-5xl group-hover:scale-125 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-blue-dark mb-2 group-hover:text-blue transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-blue-dark/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
