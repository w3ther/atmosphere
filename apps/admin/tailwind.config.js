/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    screens: {
      sm: "380px",
      md: "768px",
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [],
};
