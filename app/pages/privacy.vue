<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: privacy, refresh } = await useAsyncData(() => 
  queryCollection('privacy').where('stem', '=', `privacy/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

const titleRef = ref(null)
const subtitleRef = ref(null)
const contentRef = ref(null)
const { fadeInUp, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (titleRef.value) {
    fadeInUp(titleRef.value, { delay: 0.1 })
  }
  
  if (subtitleRef.value) {
    fadeInUp(subtitleRef.value, { delay: 0.2 })
  }
  
  if (contentRef.value) {
    fadeInUp(contentRef.value, { delay: 0.3 })
  }
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-12 max-w-4xl mx-auto">
        <h1 ref="titleRef" class="text-3xl lg:text-5xl font-bold text-primary mb-4">{{ privacy.title }}</h1>
        <p ref="subtitleRef" class="text-lg text-toned mb-12">{{ privacy.subtitle }}</p>
        
        <div ref="contentRef">
          <ContentRenderer :value="privacy" class="prose prose-lg dark:prose-invert max-w-none" />
        </div>
      </div>
    </UContainer>
  </div>
</template>

