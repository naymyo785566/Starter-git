/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Sans': ['Montserrat','Padauk', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}

