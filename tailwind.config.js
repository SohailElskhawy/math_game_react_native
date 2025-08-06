/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  safelist: [
    'text-red-700', 'text-red-500',
    'text-blue-700', 'text-blue-500',
    'text-pink-700', 'text-pink-500',
    'text-purple-700', 'text-purple-500',
    'text-orange-700', 'text-orange-500',
    'dark:text-red-500', 'dark:text-blue-500', 'dark:text-pink-500', 'dark:text-purple-500', 'dark:text-orange-500'
  ],
  theme: {
    extend: {
      colors:{
        blue:"#3b82f6",
        red:"#ef4444",
        pink:"#ec4899",
        purple:"#a855f7",
        orange:"#f97316"
      },
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};