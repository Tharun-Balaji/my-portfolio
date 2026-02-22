import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";

const isNetlify = process.env.NETLIFY === "true";
const appBase = process.env.PUBLIC_BASE_PATH || (isNetlify ? "/" : "/my-portfolio");
const appScope = appBase === "/" ? "/" : `${appBase}/`;
const siteUrl = isNetlify
  ? process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL
  : "https://tharun-balaji.github.io";
const navigateFallbackAllowlist = appBase === "/" ? [/^\/$/] : [/^\/my-portfolio\/?$/];

export default defineConfig({
  site: siteUrl || "https://tharun-balaji.github.io",
  base: appBase,
  output: "static",
  integrations: [
    react(),
    tailwind(),
    AstroPWA({
      registerType: "autoUpdate",
      injectRegister: null,
      devOptions: {
        enabled: false,
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
        navigateFallbackAllowlist,
      },
    }),
  ],
});
