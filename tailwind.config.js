/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5a81fa",
        secondary: "#2c3d8f",
        secondary_light: "#cddeff",
        secondary_light_2: "#f2f5ff",
      },
      fontFamily: {
        Poppins: ["Poppins", "verdana", "sans-serif"],
        // sans: ['Graphik', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      backgroundImage: {
        seeYouSoonImage:
          "linear-gradient(to right, rgba(44, 61, 143, 1), rgba(44, 61, 143, 0.4) ,rgba(0, 0, 0, 0)) ,url('/src/assets/seeyousoon.jpg')",
        noAppointmentImage:
          "linear-gradient(to right, rgba(44, 61, 143, 1), rgba(44, 61, 143, 0.4) ,rgba(0, 0, 0, 0)) ,url('/src/assets/plus_sign.jpg')",
      },
    },
  },
  plugins: [],
};
