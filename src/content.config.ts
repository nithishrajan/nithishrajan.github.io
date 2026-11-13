import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const ephemera = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/ephemera' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      type: z.enum(['photo', 'video', 'gallery']),
      images: z.array(image()).default([]),
      video: z.string().url().optional(), // YouTube / Vimeo / Cloudflare Stream embed URL
      caption: z.string().optional(),
      location: z.string().optional(),
    }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      cover: image().optional(),
      spineColor: z.string().default('#8a5a3b'),
      rating: z.number().int().min(1).max(5).optional(),
      status: z.enum(['read', 'reading', 'want']),
      recommended: z.boolean().default(false),
      dateRead: z.coerce.date().optional(),
      blurb: z.string().optional(),
      tags: z.array(z.string()).default([]),
    }),
});

const now = defineCollection({
  loader: file('./src/content/now.json'),
  schema: z.object({
    reading: z.string(),
    lastPlace: z.string(),
    workingOn: z.string(),
    listening: z.string().optional(),
    timezone: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { blog, ephemera, books, now };
