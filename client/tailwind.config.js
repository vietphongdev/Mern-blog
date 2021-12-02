const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],

  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        light: '#ffffff',
        DEFAULT: '#ffffff',
        dark: '#25354C',
      },
      blue: {
        light: '#85d7ff',
        DEFAULT: '#1fb6ff',
        dark: '#25354C',
      },
      orange: {
        light: '#ff8100',
        DEFAULT: '#ef7c07',
        dark: '#AD4343',
      },
      gray: {
        lightest: '#f2f2f330',
        light: '#e0e6ed',
        DEFAULT: '#dddddd',
        dark: '#ebeef5',
        darkest: '#606266',
      },
      red: {
        lightest: '#fef0f0',
        light: '#f56c6c',
        DEFAULT: '#ef4444',
        dark: '#dc2626',
        darkest: '#b91c1c',
      },
      green: {
        lightest: '#f0f9eb',
        light: '#67c23a',
        DEFAULT: '#ef4444',
        dark: '#dc2626',
        darkest: '#b91c1c',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      display: ['responsive', 'group-hover', 'group-focus'],
    },
  },
  // plugins: [
  //   require("@tailwindcss/forms"), // import tailwind forms
  // ],
};
