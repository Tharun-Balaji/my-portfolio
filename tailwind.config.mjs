/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        neon: {
          yellow: "#ffe45c",
          lime: "#7dff7a",
          mint: "#5fffe1",
          cyan: "#00d9ff",
          pink: "#ff4fb7",
          orange: "#ff8a3d",
          cream: "#fffee2",
          navy: "#111a56",
          ink: "#070b2d",
        },
      },
      fontFamily: {
        display: ['"Rubik Mono One"', "monospace"],
        body: ['"Chakra Petch"', "sans-serif"],
      },
      boxShadow: {
        retro: "6px 6px 0 #141f64",
        card: "8px 8px 0 rgba(12, 19, 67, 0.78)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(0, 217, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 79, 183, 0.12) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
