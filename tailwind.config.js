/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          black: '#121212',
          dark: '#181818',
          light: '#282828',
          green: '#1db954',
          white: '#ffffff',
          gray: '#b3b3b3',
          'gray-dark': '#808080',
        }
      },
      fontFamily: {
        'circular': ['Circular Std', 'sans-serif'],
      },
    },
  },
  plugins: [],
}