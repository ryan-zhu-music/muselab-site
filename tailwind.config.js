/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{pages,components}/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F4F7FFE1",
      },
      boxShadow: {
        sm: "0 0 25px 0 rgba(92, 108, 150, 0.6)",
      },
    },
  },
  plugins: [],
};
