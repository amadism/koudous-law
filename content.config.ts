import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const expertiseSchema = z.object({
  title: z.string(),
  intro: z.string(),
  howIHelp: z.object({
    heading: z.string(),
    description: z.string(),
    details: z.string().optional(),
  }),
  services: z.object({
    heading: z.string(),
    list: z.array(z.string()),
    extra: z.string().optional(),
    details: z.string().optional(),
  }),
  whyMe: z.object({
    heading: z.string(),
    description: z.string(),
    details: z.string().optional(),
  }),
  cta: z.object({
    heading: z.string(),
    text: z.string(),
    button: z.string(),
  }),
})

const servicesSchema = z.object({
  serviceName: z.string(),
  tagline: z.string(),
  overview: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
  }),
  whatYouGet: z.object({
    title: z.string(),
    summary: z.string(),
    details: z.string(),
  }),
  howItWorks: z.object({
    title: z.string(),
    features: z.array(z.string()),
    approach: z.string(),
    timeline: z.string(),
  }),
  idealFor: z.object({
    title: z.string(),
    target: z.string(),
    benefits: z.string(),
  }),
  callToAction: z.object({
    heading: z.string(),
    message: z.string(),
    buttonText: z.string(),
  }),
})

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  author: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export default defineContentConfig({
  collections: {
    expertise: defineCollection({
      type: 'data',
      source: 'expertise/**',
      schema: expertiseSchema,
    }),
    services: defineCollection({
      type: 'data',
      source: 'services/**',
      schema: servicesSchema,
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: blogSchema,
    }),
  },
})

