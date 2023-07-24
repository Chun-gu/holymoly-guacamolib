/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: { max: '767px' },
      md: { min: '768px', max: '1023px' },
      lg: { min: '1024px' },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      yellow: { light: '#fdfad1' },
      green: { disabled: '#9ad9b0', light: '#5fe18c', DEFAULT: '#38af61' },
      white: '#ffffff',
      grey: {
        100: '#f5f5f5',
        200: '#f3f3f3',
        300: '#e9e9e9',
        400: '#e3e3e3',
        500: '#d6d6d6',
        600: '#c9c9c9',
        700: '#b9b9b9',
        800: '#7f7f7f',
      },
      black: '#000000',
    },
  },
  plugins: [],
}
