import { getFeed, getBooks } from '../lib/feed';

// Every page worth landing on. "surprise me" picks one of these at random.
export async function GET() {
  const feed = await getFeed();
  const books = await getBooks();
  const urls = new Set([...feed.map((f) => f.url), ...books.map((b) => `/books/${b.id}/`)]);
  return new Response(JSON.stringify([...urls]), { headers: { 'Content-Type': 'application/json' } });
}
