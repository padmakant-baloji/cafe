import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        blue: {
          dark: '#1E3A5F', // Dark blue from fork
          DEFAULT: '#2563EB', // Blue from right curve
          light: '#3B82F6',
          lighter: '#60A5FA',
        },
        green: {
          DEFAULT: '#22C55E', // Green from spoon and heart
          light: '#4ADE80',
          dark: '#16A34A', // Dark green from logo
          vibrant: '#10B981',
        },
        gold: {
          DEFAULT: '#FBBF24', // Golden yellow from left curve
          light: '#FCD34D',
          dark: '#F59E0B',
        },
        neutral: {
          white: '#FFFFFF',
          cream: '#FAFAFA',
          light: '#F5F5F5',
          gray: '#E5E7EB',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
