import { getCollection } from 'astro:content';

const newestFirst = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

export const getPosts = async () =>
  (await getCollection('ephemera', (p) => import.meta.env.DEV || !p.data.draft)).sort(newestFirst);

export const getSnapshots = async () => (await getCollection('snapshots')).sort(newestFirst);

export const getBooks = async () => (await getCollection('literature')).sort(newestFirst);

/** "rainy-tram/index" → "rainy-tram" */
export const slugOf = (id: string) => id.replace(/\/index$/, '');

export const prettyDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** Photos dropped into a folder, in filename order (01.jpg, 02.jpg, …). */
export function photosIn(folder: 'home' | 'me') {
  const all = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,jpeg,png,webp,avif}', {
    eager: true,
  });
  return Object.entries(all)
    .filter(([path]) => path.startsWith(`../assets/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, mod]) => mod.default);
}
