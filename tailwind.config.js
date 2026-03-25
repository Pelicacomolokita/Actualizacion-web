/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/**/*.js",
    "./txt/**/*.md"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        'primary-dark': '#B91C1C',
        'background-light': '#F9FAFB',
        'background-dark': '#111111',
        'dark-bg': '#09090b',
        base: '#09090b',
        surface: '#18181b',
        'surface-alt': '#27272a',
        'border-dark': '#3f3f46',
        'navy-900': '#111111',
        'navy-800': '#111111',
        charcoal: '#1F1F1F',
      },
      fontFamily: {
        display: ['Inter', 'Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
