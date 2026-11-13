import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://nithishrajan.github.io',
  integrations: [mdx(), sitemap()],
});
