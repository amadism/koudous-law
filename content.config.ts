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
  date: z.string(),
  author: z.string(),
  readTime: z.string(),
  category: z.string(),
  image: z.string().optional()
})

const navlinksSchema = z.object({
  body: z.array(z.object({
    label: z.string(),
    path: z.string().optional(),
    children: z.array(z.object({
      label: z.string(),
      path: z.string(),
    })).optional(),
  })),
})

const footerSchema = z.object({
  contact: z.object({
    title: z.string(),
    email: z.string(),
    bookCall: z.string(),
  }),
  location: z.object({
    title: z.string(),
    address: z.object({
      line1: z.string(),
      line2: z.string(),
    }),
  }),
  copyright: z.string(),
  links: z.object({
    legalNotice: z.string(),
    privacyPolicy: z.string(),
  }),
})

const homeSchema = z.any()
const aboutSchema = z.any()
const contactSchema = z.any()

export default defineContentConfig({
  collections: {
    navlinks: defineCollection({ type: 'data', source: 'navlinks/**.json', schema: navlinksSchema }),
    home: defineCollection({ type: 'data', source: 'home/**.json', schema: homeSchema }),
    footer: defineCollection({ type: 'data', source: 'footer/**.json', schema: footerSchema }),
    about: defineCollection({ type: 'data', source: 'about/**.json', schema: aboutSchema }),
    contact: defineCollection({ type: 'data', source: 'contact/**.json', schema: contactSchema }),
    expertise: defineCollection({ type: 'data', source: 'expertise/**/*.json', schema: expertiseSchema }),
    services: defineCollection({ type: 'data', source: 'services/**/*.json', schema: servicesSchema }),
    blog: defineCollection({ type: 'page', source: 'blog/**/*.md', schema: blogSchema }),
  },
})

