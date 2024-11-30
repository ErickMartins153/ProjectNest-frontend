/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#00809d",
        "secondary-color": "#084156",
        "selected-blue": "#5492a4",
        white: "#e9e9e9",
        black: "#2a2a2a",
      },
      boxShadow: {
        bottom: "0 6px 8px rgba(0, 0, 0, 0.25)",
      },
      screens: {
        md: "940px",
      },
    },
  },
  plugins: [],
};
