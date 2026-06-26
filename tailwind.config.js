/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medBg: '#F4FAFA',
        medSidebar: '#EEF7F8',
        medDarkTeal: '#064E4A',
        medTeal: '#0F766E',
        medSoftBlue: '#E0F2FE',
        medLightGreen: '#DCFCE7',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
