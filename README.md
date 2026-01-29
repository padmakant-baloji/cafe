# Baloji's Cafe - Premium Animated Website

A cinematic, award-level animated café website where the entire design, layout, visuals, and animations are driven by the menu items themselves.

## 🚀 Features

- **Menu-Driven Design**: Each menu category has unique styling and animations inspired by the food type
- **Cinematic Animations**: GSAP ScrollTrigger for major animations, Framer Motion for micro-interactions
- **Premium UX**: Smooth 60fps animations, scroll-friendly, respects `prefers-reduced-motion`
- **Fully Responsive**: Mobile-optimized with reduced animation distances (40% less on mobile)
- **Accessible**: WCAG compliant with motion reduction support

## 🧱 Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **GSAP** (ScrollTrigger)
- **Framer Motion**

## 🎨 Design System

### Colors (Matching Logo)
- Dark Blue: `#1E3A5F` (from fork)
- Green: `#22C55E` (from spoon and heart)
- Golden Yellow: `#FBBF24` (from left curve)
- Blue: `#2563EB` (from right curve)
- White/Neutral: Clean backgrounds

### Typography
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎥 Animation Rules

- Smooth ease-in-out only (no bounce or elastic)
- 60fps, scroll-friendly
- Animations enhance content, never distract
- Respects `prefers-reduced-motion`
- No animation blocks scrolling
- Mobile: 40% reduced animation distances

## 🏠 Menu Categories

Each category has unique styling and animations:

1. **🍲 Soups** - Warm & Flowing (soft gradients, steam overlays)
2. **🍟 Quick Bites** - Energetic & Crunchy (staggered pop-in)
3. **🍚 Rice & Noodles** - Street-Style Motion (slide-in from sides)
4. **🌯 Rolls** - Compact & Layered (layered reveal)
5. **🍝 Pasta** - Smooth & Creamy (gentle zoom-in)
6. **🍕 Pizzas** - Bold & Center Stage (slow scale + hover effects)
7. **🍔 Burgers** - Heavy & Satisfying (weighty drop-in)
8. **🥪 Sandwiches** - Clean & Simple (fade + slight lift)
9. **🥟 Momos** - Playful & Steamy (steam on hover)
10. **☕ Beverages** - Calm & Minimal (gentle fade)
11. **🍰 Desserts** - Luxury Finish (slow reveal + glow)

## 📱 Mobile Optimization

- Animation distances reduced by 40%
- Heavy parallax disabled
- Touch interactions feel instant
- Same visual hierarchy maintained

## 🎯 Production Ready

- TypeScript for type safety
- Optimized animations
- Accessible markup
- SEO-friendly structure
- Performance optimized

## 📄 License

This project is created for Baloji's Cafe.
