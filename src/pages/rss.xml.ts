import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/feed';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'Nithish Rajan — ephemera',
    description: 'Things I wrote down.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description ?? "",
      link: `/ephemera/${p.id}/`,
    })),
  });
}
