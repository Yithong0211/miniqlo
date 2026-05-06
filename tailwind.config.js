/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FDFAF5',
        beige: '#F5EFE0',
        blush: '#F9E8E8',
        'baby-blue': '#D6EAF8',
        'soft-blue': '#EBF5FB',
        sage: '#C8DAD1',
        'soft-sage': '#E8F5E9',
        charcoal: '#2C2C2C',
        muted: '#8A8A8A',
        'miniqlo-pink': '#F4A7B9',
        'miniqlo-blue': '#7EC8E3',
        'miniqlo-yellow': '#FFE0A3',
        'miniqlo-green': '#A8D8B9',
        'miniqlo-lavender': '#C9B8E8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12)',
        'soft': '0 2px 16px rgba(0,0,0,0.05)',
        'glow-pink': '0 0 30px rgba(244,167,185,0.4)',
        'glow-blue': '0 0 30px rgba(126,200,227,0.4)',
      },
      backgroundImage: {
        'gradient-pastel': 'linear-gradient(135deg, #FDFAF5 0%, #F5EFE0 50%, #EBF5FB 100%)',
        'gradient-hero': 'linear-gradient(120deg, #FDF2F8 0%, #EBF5FB 40%, #F0FFF4 100%)',
        'gradient-sale': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [],
}
