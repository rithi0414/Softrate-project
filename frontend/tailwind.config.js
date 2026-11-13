/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zoho: {
          red: '#E42528',
          redHover: '#C51F22',
          redLight: '#FDF2F2',
          dark: '#0F172A',
          navy: '#1E293B',
          gray: '#64748B',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          blue: '#1A73E8'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'Consolas', 'monospace']
      }
    }
  },
  plugins: []
};
