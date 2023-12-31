const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './HOC/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blau: '#0033A3',
      blau2: '#003CBE',
      blau3: '#0050D5',
      blau4: '#0065EB',
      blau5: '#007CFF',
      blau6: '#1A8CFF',
      blau7: '#47A1FF',
      blau8: '#67B3FF',
      blau9: '#8BCBFF',
      blau10: '#0065EB',
      blau11: '#E9F7FF',
      gelb: '#FCBB00',
      gelb2: '#FFDA00',
      gelb3: '#FFF575',
      rot: '#EB5A68',
      neuter: '#2A3039',
    },
    extend: {
      fontFamily: {
        AvenirNextLTW02: ['AvenirNextLTW02-Regular', 'sans-serif'],
        AvenirNextLTitalic: ['AvenirNextLTW02-It', 'sans-serif'],
        AvenirNextLTDemi: ['AvenirNextLTW02-Demi', 'sans-serif'],
        AvenirNextLTBold: ['AvenirNextLTW02-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
