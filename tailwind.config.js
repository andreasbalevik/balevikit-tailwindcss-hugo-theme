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
          lg: "1280px",
       }
      },

      colors: {
        primary : '#243c5a'
      },

      margin: {
        small: "1rem",
        medium : "1.5rem",
        large: "2.5rem"
      },

      padding: {
        small: "0.5rem",
        medium : "1.5rem",
        large: "2.5rem"
      },
    },

    

    

  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite-typography'),
  ],
}

