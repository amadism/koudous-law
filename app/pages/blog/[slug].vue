<script setup>
import { watch } from 'vue'
const route = useRoute()
const { locale } = useI18n()

const { data: content, refresh } = await useAsyncData(
  () => `blog-${route.params.slug}`,
  () => queryCollection('blog').where('stem', '=', `blog/${route.params.slug}/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

watch(() => route.params.slug, () => {
  refresh()
})

useSeoMeta({
  title: content.value?.meta?.title || 'Blog Post',
  description: content.value?.meta?.description || '',
  ogTitle: content.value?.meta?.title,
  ogDescription: content.value?.meta?.description,
  ogImage: content.value?.meta?.image,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div v-if="content?.meta">
    <!-- Hero Section -->
    <div class="bg-gray-100 dark:bg-[#111] py-6">
      <UContainer>
          <div class="mb-4 flex items-center gap-4 text-sm text-toned">
            <NuxtLink to="/blog" class="hover:text-primary transition-colors">
              ← {{ locale === 'de' ? 'Zurück zum Blog' : locale === 'ja' ? 'ブログに戻る' : 'Back to Blog' }}
            </NuxtLink>
          </div>
          
          <div class="flex items-center gap-3 text-sm text-toned mb-4">
            <span v-if="content.category" class="text-primary font-medium">
              {{ content.category }}
            </span>
            <UButton variant="soft" color="neutral" v-if="content.date">
              {{ new Date(content.date).toLocaleDateString(locale === 'de' ? 'de-DE' : locale === 'ja' ? 'ja-JP' : 'en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              }) }}
            </UButton>
            <UButton variant="soft" color="neutral" v-if="content.readTime">
              {{ content.readTime }}
            </UButton>
          </div>

          <h1 class="text-3xl lg:text-5xl font-bold text-primary mb-4">
            {{ content.title }}
          </h1>
          
          <p class="text-toned lg:text-xl mb-6">
            {{ content.description }}
          </p>

          <div v-if="content.author" class="text-sm text-toned">
            {{ locale === 'de' ? 'Von' : locale === 'ja' ? '著者' : 'By' }} {{ content.author }}
          </div>
      </UContainer>
    </div>

    <!-- Featured Image -->
    <div v-if="content.image" class="mt-6">
      <UContainer>
        <div class="">
          <img 
            :src="content.image" 
            :alt="content.title"
            class="w-full aspect-video object-cover max-h-[50dvh]"
          />
        </div>
      </UContainer>
    </div>

    <!-- Blog Content -->
    <UContainer>
      <div class="py-12">
        <div class="">
          <div class="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:text-primary prose-headings:font-bold
                      prose-h1:text-4xl prose-h1:mb-6
                      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                      prose-p:text-toned prose-p:leading-relaxed prose-p:mb-4
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-primary prose-strong:font-semibold
                      prose-ul:text-toned prose-ul:my-6
                      prose-ol:text-toned prose-ol:my-6
                      prose-li:my-2
                      prose-code:text-primary prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded">
            <ContentRenderer :value="content" />
          </div>
        </div>
      </div>
    </UContainer>
  </div>

  <!-- Loading/Error State -->
  <div v-else class="py-12">
    <UContainer>
      <div class="text-center">
        <h1 class="text-3xl font-bold text-primary mb-4">
          {{ locale === 'de' ? 'Blog-Beitrag nicht gefunden' : 
             locale === 'ja' ? 'ブログ記事が見つかりません' : 
             'Blog Post Not Found' }}
        </h1>
        <p class="text-toned mb-6">
          {{ locale === 'de' ? 'Der gesuchte Blog-Beitrag existiert nicht oder wurde entfernt.' :
             locale === 'ja' ? 'お探しのブログ記事は存在しないか、削除されました。' :
             'The blog post you are looking for does not exist or has been removed.' }}
        </p>
        <UButton to="/blog">
          {{ locale === 'de' ? 'Zurück zum Blog' : 
             locale === 'ja' ? 'ブログに戻る' : 
             'Back to Blog' }}
        </UButton>
      </div>
    </UContainer>
  </div>
</template>

