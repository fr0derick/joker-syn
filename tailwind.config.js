/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind scans your project files for classes
  ],
  theme: {
    extend: {},
  },
  variants: {
    minHeight: ['responsive']
  },
  plugins: [],
};


