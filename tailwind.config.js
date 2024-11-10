/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./public/index.html",
  ],  theme: {
    extend: { fontFamily: {
        vietnam: ['"Be Vietnam Pro"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
        press: ['"Press Start 2P"', 'cursive'],
        roboto: ['"Roboto"', 'sans-serif'],
        sourGummy: ['"Sour Gummy"', 'sans-serif'],
            lato: ['Lato', 'sans-serif'],


        },},
  },
/*  plugins: [    require('daisyui'),
  ],*/
}

