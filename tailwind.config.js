/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Ubuntu Mono"', 'ui-sans-serif', 'system-ui'],
        mono: ['"Ubuntu Mono"', 'ui-monospace', 'SFMono-Regular'],
      },
    },
  },

  plugins: [],
};
