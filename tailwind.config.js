const { DEFAULT } = require('flowbite-typography/src/styles');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "content/**/*.md", 
    "layouts/**/*.html", 
    "../../layouts/**/*.html", 
    "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: "1250px",
       }
      },
      maxWidth: {
        'screen-sm': '768px',
      },
      colors: {
        'primary': 'rgb(var(--color-primary,26,86,219),1)',
        'primary--hover': 'rgb(var(--color-primary,26,86,219),.9)',
        'primary--heading': 'rgb(var(--color-primary,26,86,219),.9)',
        'primary--light': 'rgb(var(--color-primary,26,86,219),.05)'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography'),
    require('tailwindcss-debug-screens')
  ],
}

