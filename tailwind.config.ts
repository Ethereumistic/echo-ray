import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'gg': '1080px',
      // => @media (min-width: 1080px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      '3xl': '1780px',
      // => @media (min-width: 1536px) { ... }
      'cst': '932px',
    },
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        scroll:
        "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        flipTop: 'flipTop 1s ease-in',
        flipBottom: 'flipBottom 1s ease-in',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      
      colors: {
        facebook: " #106afe ", 
        youtube: " #FF0000 ",
        lred: " #5ebb46 ",
        lblack: " #1A1A1A ",
        ldark: " #121212 ",
        dred: " #4C0414 ",
        lyellow: " #FFDE59 ",
        dyellow: " #60562E ",

        lblue: " #58779F",
        llblue: " #8CB2E4",
        dblue: " #1A2A40",
        ddblue: "#132031",
        sgreen:"#7A8B7F",
        cream:"#F5F1E8",
        
        rred:"#A34A28",
        theme_grayishBlue: 'hsl(237, 18%, 59%)',
        theme_softRed: '#fff',
        theme_white: 'hsl(0, 0%, 100%)',
        theme_darkDesaturatedBlue: 'hsl(236, 21%, 26%)',
        theme_veryDarkBlue: 'hsl(235, 16%, 14%)',
        theme_veryDarkMostlyBlackBlue: 'hsl(234, 17%, 12%)',
      },

      fontFamily: {
        // to change, update font in _document.js
        russo: ["var(--font-russo)"],
        osw: ["var(--font-osw)"],
        pacifico: ["var(--font-pacifico)"],
        paci: ["var(--font-paci)"],
        geistSans: ["var(--font-geist-sans)"],
        geistMono: ["var(--font-geist-mono)"],
        montserrat: ["var(--font-montserrat)"],
      },
      keyframes: {
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        flipTop: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-180deg)' }
        },
        flipBottom: {
          '0%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(0deg)' }
        }
      }
    },
  },
  
  plugins: [
    addVariablesForColors,

    plugin(function ({ addUtilities }: any) {
      const newUtilities = {
        '.brightness-80': {
          filter: 'brightness(80%)'
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden'
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d'
        },
        '.perspective': {
          'perspective-origin': '50% 50%',
          perspective: '450px'
        },
        '.bg-x-82': {
          'background-position-x': '82%'
        }
      }

      addUtilities(newUtilities)
    }),
  ],
};
 
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
