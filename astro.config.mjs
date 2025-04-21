// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import dotenv from 'dotenv';
dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  base: process.env.PUBLIC_BASE_URL || '/',
  site: process.env.PUBLIC_SITE_URL
    ? process.env.PUBLIC_SITE_URL + (process.env.PUBLIC_BASE_URL || '')
    : undefined,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: false, // <-- disables Shiki (which adds inline styles)
  },
});
