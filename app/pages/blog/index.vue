<script setup>
import { watch } from 'vue'
const { locale } = useI18n()

const { data: blogs, refresh } = useAsyncData(
  'blogs',
  async () => {
    const results = await queryCollection('blog').all()
    
    const filteredBlogs = results
      .filter(blog => blog.stem?.includes(`/${locale.value}`))
      .sort((a, b) => {
        const dateA = new Date(a.meta?.date || 0)
        const dateB = new Date(b.meta?.date || 0)
        return dateB - dateA
      })
    
    return filteredBlogs
  }
)

watch(locale, () => {
  refresh()
})

useSeoMeta({
  title: locale.value === 'de' ? 'Blog - Koudous Rechtsanwälte' : 
         locale.value === 'ja' ? 'ブログ - Koudous法律事務所' : 
         'Blog - Koudous Law Office',
  description: locale.value === 'de' ? 'Rechtliche Einblicke und Expertenmeinungen zu Wirtschaftsrecht, Technologie und mehr.' :
               locale.value === 'ja' ? 'ビジネス法、テクノロジーなどに関する法的洞察と専門家の意見。' :
               'Legal insights and expert opinions on business law, technology, and more.'
})

const titleRef = ref(null)
const subtitleRef = ref(null)
const { fadeInUp, staggerFadeInUp, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (titleRef.value) {
    fadeInUp(titleRef.value, { delay: 0.1 })
  }
  
  if (subtitleRef.value) {
    fadeInUp(subtitleRef.value, { delay: 0.2 })
  }
  
  nextTick(() => {
    const cards = document.querySelectorAll('.blog-card')
    if (cards.length > 0) {
      staggerFadeInUp(Array.from(cards), { delay: 0.2, stagger: 0.1 })
    }
  })
})
</script>

<template>
  <div>
    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <h1 ref="titleRef" class="text-3xl lg:text-5xl font-bold text-primary mb-4">
          {{ locale === 'de' ? 'Blog' : locale === 'ja' ? 'ブログ' : 'Blog' }}
        </h1>
        <p ref="subtitleRef" class="text-toned lg:text-xl">
          {{ locale === 'de' ? 'Rechtliche Einblicke und Expertenmeinungen' : 
             locale === 'ja' ? '法的洞察と専門家の意見' : 
             'Legal insights and expert opinions' }}
        </p>
      </UContainer>
    </div>

    <UContainer>
      <div class="py-12">
        <div v-if="blogs && blogs.length > 0" class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <NuxtLink 
            v-for="blog in blogs" 
            :key="blog.stem"
            :to="`/blog/${blog.stem?.split('/')[1]}`"
            class="blog-card group cursor-pointer"
          >
            <UCard variant="soft" color="neutral" class="overflow-hidden h-full flex flex-col">
              <div v-if="blog.image" class="aspect-video overflow-hidden">
                <img
                  :src="blog.image" 
                  :alt="blog.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div class="py-4 flex-1 flex flex-col">
                <div class="flex items-center gap-3 text-sm text-toned mb-3">
                  <span v-if="blog?.category" class="text-primary font-medium">
                    {{ blog.category }}
                  </span>
                  <span v-if="blog?.date">
                    {{ new Date(blog.date).toLocaleDateString(locale === 'de' ? 'de-DE' : locale === 'ja' ? 'ja-JP' : 'en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) }}
                  </span>
                </div>
                <h2 class="text-xl font-bold text-primary mb-3 group-hover:text-opacity-80 transition-colors">
                  {{ blog?.title }}
                </h2>
                <p class="text-toned mb-4 flex-1 line-clamp-2">
                  {{ blog?.description }}
                </p>
                <div class="flex items-center justify-between text-sm">
                  <span v-if="blog?.readTime" class="text-toned">
                    {{ blog?.readTime }}
                  </span>
                  <span class="text-primary font-medium group-hover:translate-x-1 transition-transform inline-block">
                    {{ locale === 'de' ? 'Weiterlesen →' : locale === 'ja' ? '続きを読む →' : 'Read more →' }}
                  </span>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-12">
          <p class="text-toned text-lg">
            {{ locale === 'de' ? 'Keine Blogbeiträge gefunden' : 
               locale === 'ja' ? 'ブログ記事が見つかりません' : 
               'No blog posts found' }}
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>