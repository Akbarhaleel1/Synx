// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     fontSize: {
//       xs: ['12px', '16px'],
//       sm: ['14px', '20px'],
//       base: ['16px', '19.5px'],
//       lg: ['18px', '21.94px'],
//       xl: ['20px', '24.38px'],
//       '2xl': ['24px', '29.26px'],
//       '3xl': ['28px', '50px'],
//       '4xl': ['48px', '58px'],
//       '8xl': ['96px', '106px']
//     },
//     extend: {
//       fontFamily: {
//         palanquin: ['Palanquin', 'sans-serif'],
//         montserrat: ['Montserrat', 'sans-serif'],
//       },
//       colors: {
//         'primary': "#ECEEFF",
//         "coral-red": "#FF6452",
//         "slate-gray": "#6D6D6D",
//         "pale-blue": "#F5F6FF",
//         "white-400": "rgba(255, 255, 255, 0.80)"
//       },
//       boxShadow: {
//         '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
//       },
//       backgroundImage: {
//         'hero': "url('assets/images/collection-background.svg')",
//         'card': "url('assets/images/thumbnail-background.svg')",
//       },
//       screens: {
//         "wide": "1440px"
//       },
//       colors:{
//         'custom-bg':'#21201E',
//         'slate-gray': '#708090',
//       },
//       fontSize: {
//         'tiny': '0.625rem', 
//         'small': '0.75rem',
//       }
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",  // Enables dark mode with a class
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px'],
      'tiny': '0.625rem', 
      'small': '0.75rem',
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        primary: "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        'custom-bg': '#21201E',
        'slate-gray': '#708090',
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      backgroundImage: {
        'hero': "url('assets/images/collection-background.svg')",
        'card': "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        wide: "1440px",
      },
    },
  },
  plugins: [
    addVariablesForColors,
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
