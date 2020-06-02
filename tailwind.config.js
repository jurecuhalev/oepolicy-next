const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    extend: {
      spacing: {
        "15": "3.75rem",
        "30": "7rem",
      },
      colors: {
        blue: "#3E55CD",
        gray: "#EEEEEE",
        orange: "#FF9550",
        pink: "#F06094",
        white: "#FFFFFF",
      },
      fontFamily: {
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
        sans: ["Courier Prime Sans", ...defaultTheme.fontFamily.serif],
        "sans-source": ["Source Sans Pro", ...defaultTheme.fontFamily.serif],
      },
      lineHeight: {
        tight: "1.166666667",
      },
    },
    container: {
      center: true,
      padding: {
        default: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
  },
  variants: {},
  plugins: [],
  purge: [
    "./pages/**/*.js",
    "./pages/**/*.tsx",
    "./components/**/*.js",
    "./components/**/*.tsx",
  ],
}
