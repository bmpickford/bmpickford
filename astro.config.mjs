import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://benpickford.me/",
  integrations: [
    sitemap(),
    partytown({
      forward: ["dataLayer.push"],
    }),
    tailwind({
      config: { path: './tailwind.config.cjs' },
    }),
  ],
});
