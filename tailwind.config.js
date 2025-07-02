// tailwind.config.js
module.exports = {
  theme: {
    extend: {
  fontFamily: {
    sans: ['var(--font-sans)', 'sans-serif'],
    mono: ['var(--font-mono)', 'monospace'],
    montserrat: ['var(--font-montserrat)', 'sans-serif'],
  },
},

  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
  ],

};
