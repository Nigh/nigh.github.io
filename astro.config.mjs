// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import dotenv from 'dotenv';
import { loadEnv } from 'vite'; // 引入 loadEnv
import icon from 'astro-icon';

const env = loadEnv(process.cwd(), '', ['PUBLIC_', 'BEIAN']); // 加载环境变量

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), icon(), mdx()],
  base: env.PUBLIC_BASE_URL || '/',
  site: env.PUBLIC_SITE_URL
    ? env.PUBLIC_SITE_URL + (env.PUBLIC_BASE_URL || '')
    : undefined,
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    syntaxHighlight: false, // <-- disables Shiki (which adds inline styles)
  },
});
