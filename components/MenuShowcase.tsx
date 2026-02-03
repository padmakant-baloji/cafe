'use client'

import SoupSection from './menu-sections/SoupSection'
import QuickBitesSection from './menu-sections/QuickBitesSection'
import RiceNoodlesSection from './menu-sections/RiceNoodlesSection'
import RollsSection from './menu-sections/RollsSection'
import PastaSection from './menu-sections/PastaSection'
import PizzaSection from './menu-sections/PizzaSection'
import BurgerSection from './menu-sections/BurgerSection'
import SandwichSection from './menu-sections/SandwichSection'
import MomosSection from './menu-sections/MomosSection'
import BeveragesSection from './menu-sections/BeveragesSection'
import DessertsSection from './menu-sections/DessertsSection'

export default function MenuShowcase() {
  return (
    <div id="menu" className="scroll-mt-20 space-y-0">
      <SoupSection />
      <QuickBitesSection />
      <RiceNoodlesSection />
      <RollsSection />
      <PastaSection />
      <PizzaSection />
      <BurgerSection />
      <SandwichSection />
      <MomosSection />
      <BeveragesSection />
      <DessertsSection />
    </div>
  )
}
