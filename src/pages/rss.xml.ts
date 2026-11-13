import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/feed';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: '~/site — logs',
    description: 'Thoughts, written down before they were finished.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/blog/${p.id}/`,
    })),
  });
}
