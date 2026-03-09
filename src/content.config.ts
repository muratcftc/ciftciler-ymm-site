import { defineCollection, z } from 'astro:content';

const sirkulerler = defineCollection({
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		publishDate: z.date()
	})
});

export const collections = {
	sirkulerler
};
