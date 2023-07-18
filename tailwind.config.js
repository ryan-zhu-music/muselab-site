/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F4F7FFE1",
      },
    },
  },
  plugins: [],
};
