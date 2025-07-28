import TailwindAnimatePlugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'gradient-cyber-twilight': 'var(--gradient-cyber-twilight)',
        'gradient-digital-spectrum': 'var(--gradient-digital-spectrum)',
        'gradient-neon-radial': 'var(--gradient-neon-radial)',
        'gradient-techno-aqua': 'var(--gradient-techno-aqua)',
        'gradient-faded-glitch': 'var(--gradient-faded-glitch)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      // Usage: text-white, bg-gray
      colors: {
        transparent: 'transparent',
        white: 'hsl(var(--komodo-ghost-white) / <alpha-value>)',
        gray: {
          DEFAULT: 'hsl(var(--komodo-smoked-gray) / <alpha-value>)',
          light: 'hsl(var(--komodo-mid-gray) / <alpha-value>)',
        },
        blue: {
          DEFAULT: 'hsl(var(--komodo-cyber-blue) / <alpha-value>)',
          light: 'hsl(var(--komodo-electric-blue) / <alpha-value>)',
        },
        green: 'hsl(var(--komodo-cyber-green) / <alpha-value>)',
        red: 'hsl(var(--komodo-crimson) / <alpha-value>)',
        yellow: 'hsl(var(--komodo-neon-yellow) / <alpha-value>)',
        purple: 'hsl(var(--komodo-electric-purple) / <alpha-value>)',
        pink: 'hsl(var(--komodo-fuchsia) / <alpha-value>)',
        cyan: 'hsl(var(--komodo-electric-cyan) / <alpha-value>)',
        orange: 'hsl(var(--komodo-orange) / <alpha-value>)',
      },
      fontFamily: {
        DEFAULT: ['var(--font-inter)', 'sans-serif'], // Primary body font
        header: ['var(--font-michroma)', 'sans-serif'], // Header and display font
        accent: ['var(--font-pt-sans)', 'sans-serif'], // Secondary font
        mono: ['var(--font-mono)', 'monospace'], // Monospace font for code and IDs
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      spacing: {
        default: 'var(--spacing-default)',
      },
    },
  },
  plugins: [
    TailwindAnimatePlugin,
  ],
};
