module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-dark': 'rgb(22, 22, 22)',
        'app-dark-opacity': 'rgb(27, 27, 27)',
        'app-green': '#23B123',
        'app-green-opacity': '#23b12396',
        'border-dark': 'rgb(88, 88, 88, 0.74)'
      },
      spacing: {
        '18vh': '18vh',
        '82vh': '82vh',
        '6vh': '6vh',
        '70vh': '70vh',
        '12vh': '12vh',
        '88vh': '88vh',
        '100vh': '100vh'
      }
    },
  },
  plugins: [],
}