import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import AstroPWA from "@vite-pwa/astro";

const appBase = "/my-portfolio";
const appScope = `${appBase}/`;

export default defineConfig({
  site: "https://tharun-balaji.github.io",
  base: appBase,
  output: "static",
  integrations: [
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      injectRegister: null,
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Tharun Balaji Portfolio",
        short_name: "Portfolio",
        description: "Personal portfolio website of Tharun Balaji.",
        theme_color: "#0f172a",
        background_color: "#ffffff",
        display: "standalone",
        start_url: appScope,
        scope: appScope,
        icons: [
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallbackAllowlist: [/^\/my-portfolio\/?$/],
      },
    }),
  ],
});
