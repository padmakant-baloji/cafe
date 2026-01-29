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

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically deploy on every push to `main` or `master` branch

3. **Repository Name Configuration**:
   - The workflow automatically detects your repository name and sets the base path
   - If your repo is `username.github.io`, it will serve from root (no base path)
   - Otherwise, it will serve from `/repo-name/`
   - You can manually override by setting `NEXT_PUBLIC_BASE_PATH` in the workflow file

4. **Manual Build** (for testing):
   ```bash
   # For root domain (username.github.io)
   npm run build
   
   # For subdirectory (e.g., /cafe)
   NEXT_PUBLIC_BASE_PATH=/cafe npm run build
   ```

5. **Access your site**:
   - Root domain: `https://YOUR_USERNAME.github.io`
   - Subdirectory: `https://YOUR_USERNAME.github.io/REPO_NAME`

### Important Notes:
- The build creates a static export in the `out` folder
- Images are unoptimized (required for static export)
- The `.nojekyll` file prevents Jekyll processing
- GitHub Actions will automatically build and deploy on every push

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
