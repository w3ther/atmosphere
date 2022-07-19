const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    // app content
    `./src/**/*.{js,ts,jsx,tsx}`,
    "./app/**/*.{ts,tsx,jsx,js}",
  ],
  theme: {
    screens: {
      sm: "380px",
      md: "768px",
      lg: "1024px",
    },
    extend: {
      colors: {
        brandblue: colors.blue[500],
        brandred: colors.red[500],
      },
    },
  },
  plugins: [],
};
