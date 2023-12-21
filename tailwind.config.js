/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': '0.9rem',
        'base': '1rem',
        'xl': '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      colors: {
        'transparent': 'transparent',
        'white-opacity': '#efefefb8',
        'current': 'currentColor',
        'white': '#ffffff',
        'light-blue': '#1AA5C0',
        'lightly-blue': '#DFFAFF',
        'dark-blue': '#50799E',
        'dark-blue-op': 'rgba(80, 121, 158, 0.11)',
        'dark-gray': '#5E5E5E',
        'red': '#f60002',
        'green': '#068b20'

      },
   
      backgroundImage: {
        'global-svg': "url('/src/assets/svg/bg-global.svg')",
        'icon-date-svg': "url('/src/assets/svg/icon-date.svg')",
        'icon-time-svg': "url('/src/assets/svg/icon-time.svg')",
        'icon-bell-svg': "url('/src/assets/svg/icon-bell.svg')",
        'icon-search-svg': "url('/src/assets/svg/icon-search.svg')",
        'icon-full-search-svg': "url('/src/assets/svg/icon-full-search.svg')",
        'icon-add-person-svg': "url('/src/assets/svg/icon-add-person.svg')",
        'icon-add-doc-svg': "url('/src/assets/svg/icon-add-doc.svg')",
        'logo-svg': "url('/src/assets/svg/logo.svg')",
        'global-img': "url('/src/assets/svg/bg-global.png')",
      }
    },
  },
  plugins: [],
}