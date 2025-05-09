import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});
const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    links: z.record(z.string(), z.string()).optional(),
    icon: z.string().optional(),
    image: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  posts,
  projects,
};
