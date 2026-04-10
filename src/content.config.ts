import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
// import { type CollectionEntry } from "astro:content"; // 引入 CollectionEntry

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});
const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/projects" }),
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
