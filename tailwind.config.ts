import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        sm: '2rem',
        lg: '3rem',
      },
    },
    extend: {
      colors: {
        main: '#B3A99C',
        mainAccent: '#D6CFCF', // not needed for shadcn components
        overlay: 'rgba(0,0,0,0.8)',

        // light mode
        bg: '#D6CFCF',
        text: '#000',
        border: '#000',

        // dark mode
        darkBg: '#272933',
        darkText: '#eeefe9',
        darkBorder: '#000',
        secondaryBlack: '#212121', // opposite of plain white, not used pitch black because borders and box-shadows are that color
      },
      borderRadius: {
        base: '5px',
      },
      boxShadow: {
        light: '4px 4px 0px 0px #000',
        dark: '4px 4px 0px 0px #000',
      },
      translate: {
        boxShadowX: '4px',
        boxShadowY: '4px',
        reverseBoxShadowX: '-4px',
        reverseBoxShadowY: '-4px',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
    },
  },
  darkMode: 'class',
  plugins: [tailwindAnimate],
}
export default config