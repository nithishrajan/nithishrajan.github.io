import { getCollection } from 'astro:content';

export type Kind = 'post' | 'photo' | 'video' | 'gallery' | 'book';

export interface FeedItem {
  kind: Kind;
  title: string;
  date: Date;
  url: string;
  hash: string;
  note?: string;
}

/** short git-ish hash, stable per item */
export function shortHash(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

export const getPosts = async () =>
  (await getCollection('blog', (p) => import.meta.env.DEV || !p.data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

export const getEphemera = async () =>
  (await getCollection('ephemera')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

export const getBooks = async () => getCollection('books');

/** id of a folder-based entry: "rainy-tram/index" → "rainy-tram" */
export const slugOf = (id: string) => id.replace(/\/index$/, '');

/** everything, newest first — the "git log of life" */
export async function getFeed(): Promise<FeedItem[]> {
  const [posts, eph, books] = await Promise.all([getPosts(), getEphemera(), getBooks()]);
  const items: FeedItem[] = [
    ...posts.map((p) => ({
      kind: 'post' as const,
      title: p.data.title,
      date: p.data.date,
      url: `/blog/${p.id}/`,
      hash: shortHash('blog/' + p.id),
      note: p.data.description,
    })),
    ...eph.map((e) => ({
      kind: e.data.type as Kind,
      title: e.data.title,
      date: e.data.date,
      url: `/ephemera/${slugOf(e.id)}/`,
      hash: shortHash('eph/' + e.id),
      note: e.data.location,
    })),
    ...books
      .filter((b) => b.data.dateRead)
      .map((b) => ({
        kind: 'book' as const,
        title: `${b.data.title} — ${b.data.author}`,
        date: b.data.dateRead!,
        url: `/books/${b.id}/`,
        hash: shortHash('book/' + b.id),
        note: b.data.rating ? '★'.repeat(b.data.rating) : undefined,
      })),
  ];
  return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export const readingTime = (body = '') => Math.max(1, Math.round(body.split(/\s+/).length / 220));

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
