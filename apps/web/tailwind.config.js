/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/shared/src/**/*.{js,ts,jsx,tsx}", // Also look at shared if you put UI there later
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}