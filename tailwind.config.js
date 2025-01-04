const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // your paths
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        colorshift: 'colorShift 5s linear infinite',
      },

      keyframes: {
        colorShift: {
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '100%' },
        },
      },
      fontFamily: {
        Inter: ['Inter', 'serif'],
        Jersey: ['Jersey 15', 'serif'],
      },
    },
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ':root': newVars,
  });
}
