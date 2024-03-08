/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* aggiungi nuovi colori qua
      */
      
colors:{
  prim:'#416D19',
  second:'#9BCF53',
  terz:'#BFEA7C',
  quart:'#FFF67E'
}
  },

    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
},
  variants: {
    extend: {},
  },
  plugins: [],
}
