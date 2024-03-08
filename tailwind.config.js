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
},
  variants: {
    extend: {},
  },
  plugins: [],
}
