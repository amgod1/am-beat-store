/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#32f697",
        info: "#5d57ba",
        warning: "#f7bd00",
        danger: "#e11207",
        dark: "#160d0c",
        accent: "#132122",
      },
    },
  },
  plugins: [],
}
