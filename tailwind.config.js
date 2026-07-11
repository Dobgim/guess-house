/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FDFBF7',
          DEFAULT: '#F7F4EB',
          dark: '#EAE5D8',
        },
        gold: {
          light: '#DBC5A8',
          DEFAULT: '#C5A880',
          dark: '#AF9067',
        },
        sage: {
          light: '#7D8A7C',
          DEFAULT: '#606C5D',
          dark: '#485246',
        },
        charcoal: {
          light: '#4A4A4A',
          DEFAULT: '#1E1E1E',
          dark: '#121212',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
