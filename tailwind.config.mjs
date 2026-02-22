/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        neon: {
          yellow: "#fff275",
          lime: "#b4ff5e",
          mint: "#62ffd1",
          cyan: "#39d8ff",
          pink: "#ff4d9d",
          orange: "#ff9f45",
          violet: "#9c7bff",
          cream: "#fffde4",
          navy: "#19235f",
          ink: "#0a1033",
        },
      },
      fontFamily: {
        display: ['"Rubik Mono One"', "monospace"],
        body: ['"Chakra Petch"', "sans-serif"],
      },
      boxShadow: {
        retro: "6px 6px 0 #1b2a73",
        card: "8px 8px 0 rgba(16, 29, 87, 0.78)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(57, 216, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(156, 123, 255, 0.14) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
