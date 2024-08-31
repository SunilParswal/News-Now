/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "450px",
      },

      fontFamily: {
        abc: ["IBM Plex Mono"],
      },
    },
  },
  plugins: [],
};
