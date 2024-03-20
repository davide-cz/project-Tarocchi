/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* aggiungi nuovi colori qua
      */
      
colors:{
  prim:'#4ea8de',
  second:'#5390d9',
  terz:'#7400b8',
  quart:'#8566B7',
  quint:'#3a0ca3',
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
  plugins: [
   require('tailwindcss-animated')
  ],
}
