<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: content, refresh } = await useAsyncData(() => queryCollection('content').path(`/expertise/buisness-law/${locale.value}`).first())

watch(locale, () => {
  refresh()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.body.title }}</h1>
        <p class="text-toned lg:text-xl mb-8">{{ content.body.intro }}</p>

        <!-- How I Help Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.howIHelp.title }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.howIHelp.description }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.howIHelp.details }}</p>
        </div>

        <!-- Key Services Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.keyServices.title }}</h2>
          <ul class="list-disc list-inside space-y-2">
            <li class="text-toned lg:text-lg" v-for="service in content.body.keyServices.list" :key="service">
              {{ service }}
            </li>
          </ul>
        </div>

        <!-- Extra Info -->
        <p class="text-toned lg:text-lg mb-6">{{ content.body.extra }}</p>
        <p class="text-toned lg:text-lg mb-12">{{ content.body.obvious }}</p>

        <!-- Why Me Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.whyMe.title }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.whyMe.description }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.whyMe.details }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.whyMe.results }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.whyMe.proof }}</p>
        </div>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div class="text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.cta.title }}</h2>
          <p class="text-toned lg:text-xl mb-6">{{ content.body.cta.intro }}</p>
          <UButton size="lg" to="/contact">{{ content.body.cta.button }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>
