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
          lg: "1180px",
       }
      },

    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography'),
  ],
}

