/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        neon: {
          yellow: "#ffdf31",
          lime: "#83f28f",
          mint: "#76f5de",
          cyan: "#49d7ff",
          pink: "#ff5f9f",
          cream: "#fff8cf",
          navy: "#0d1740",
          ink: "#07102f",
        },
      },
      fontFamily: {
        display: ['"Rubik Mono One"', "monospace"],
        body: ['"Chakra Petch"', "sans-serif"],
      },
      boxShadow: {
        retro: "6px 6px 0 #0b1235",
        card: "8px 8px 0 rgba(7, 16, 47, 0.75)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(73, 215, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(73, 215, 255, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
