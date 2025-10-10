<script setup>
import { watch } from 'vue'
const route = useRoute()
const { locale } = useI18n()

const { data: content, refresh } = await useAsyncData(
  () => route.params.slug,
  () => queryCollection('content').path(`/services/${route.params.slug}/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})
watch(route.params.slug, () => {
  refresh()
})
</script>

<template>
  <div v-if="content?.body">
    <UContainer>
      <div class="py-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.body.serviceName }}</h1>
        <p class="text-toned lg:text-xl mb-8">{{ content.body.tagline }}</p>

        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.whatYouGet.title }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.whatYouGet.summary }}</p>
          <p v-if="content.body.whatYouGet.details" class="text-toned lg:text-lg">{{ content.body.whatYouGet.details }}</p>
        </div>

        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.howItWorks.title }}</h2>
          <ul class="list-disc list-inside space-y-2 mb-6">
            <li class="text-toned lg:text-lg" v-for="feature in content.body.howItWorks.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <p v-if="content.body.howItWorks.approach" class="text-toned lg:text-lg mb-4">{{ content.body.howItWorks.approach }}</p>
          <p v-if="content.body.howItWorks.timeline" class="text-toned lg:text-lg">{{ content.body.howItWorks.timeline }}</p>
        </div>

        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.idealFor.title }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.idealFor.target }}</p>
          <p v-if="content.body.idealFor.benefits" class="text-toned lg:text-lg">{{ content.body.idealFor.benefits }}</p>
        </div>
      </div>
    </UContainer>

    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div class="text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.callToAction.heading }}</h2>
          <p class="text-toned lg:text-xl mb-6">{{ content.body.callToAction.message }}</p>
          <UButton size="lg" to="/contact">{{ content.body.callToAction.buttonText }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>

