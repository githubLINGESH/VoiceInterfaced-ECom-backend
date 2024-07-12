/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '340px', // Small screens
        'md': '798px', // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1360px',
      },
      colors: {
        white: "#fff",
        darkslategray: {
          "100": "#2c3e50",
          "200": "rgba(44, 62, 80, 0.85)",
          "300": "rgba(44, 62, 80, 0.7)",
        },
        silver: "#bdc3c7",
        black: "#000",
        whitesmoke: {
          "100": "#ecf0f1",
          "200": "rgba(236, 240, 241, 0.7)",
        },
        gainsboro: "#d9d9d9",
        red: "#ff0000",
      },
      fontFamily: {
        sora: "Sora",
        inter: "Inter",
        inherit: "inherit",
      },
      borderRadius: {
        sm: "14px",
        "11xl": "30px",
        "8xs": "5px",
      },
    },
    fontSize: {
      "11xl": "30px",
      "9xl": "28px",
      "21xl": "40px",
      xl: "20px",
      "5xl": "24px",
      "7xl": "26px",
      "3xl": "22px",
      base: "16px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
