/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["content/**/*.md", "layouts/**/*.html"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px"
       }
      },
    },
  },
  plugins: [],
}

