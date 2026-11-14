import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// writing
const ephemera = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/ephemera' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// photos (and the odd video)
const snapshots = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/snapshots' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      type: z.enum(['photo', 'video', 'gallery']).default('photo'),
      images: z.array(image()).min(1),
      video: z.string().url().optional(), // YouTube / Vimeo embed URL; images[0] is the poster
      caption: z.string().optional(),
      location: z.string().optional(),
    }),
});

// books
const literature = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/literature' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      cover: image().optional(),
      spineColor: z.string().default('#8a5a3b'),
      rating: z.number().int().min(1).max(5).optional(),
      status: z.enum(['read', 'reading', 'want']),
      recommended: z.boolean().default(false),
      date: z.coerce.date(), // when you finished it, or started it if still reading
      blurb: z.string().optional(),
    }),
});

export const collections = { ephemera, snapshots, literature };
