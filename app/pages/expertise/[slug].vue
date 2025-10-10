<script setup>
import { watch } from 'vue'

const route = useRoute()
const { locale } = useI18n()

const { data: content, refresh } = await useAsyncData(
() => route.params.slug,
() => queryCollection('content').path(`/expertise/${route.params.slug}/${locale.value}`).first()
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
        <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.body.title }}</h1>
        <p class="text-toned lg:text-xl mb-8">{{ content.body.intro }}</p>

        <div class="mb-12">
          <h2 v-if="content.body.howIHelp.heading" class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.howIHelp.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.howIHelp.description }}</p>
          <p v-if="content.body.howIHelp.details" class="text-toned lg:text-lg">{{ content.body.howIHelp.details }}</p>
        </div>

        <div class="mb-12">
          <h2 v-if="content.body.services.heading" class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.services.heading }}</h2>
          <ul class="list-disc list-inside space-y-2 mb-6">
            <li class="text-toned lg:text-lg" v-for="service in content.body.services.list" :key="service">
              {{ service }}
            </li>
          </ul>
          <p v-if="content.body.services.extra" class="text-toned lg:text-lg mb-4">{{ content.body.services.extra }}</p>
          <p v-if="content.body.services.details" class="text-toned lg:text-lg">{{ content.body.services.details }}</p>
        </div>

        <div class="mb-12">
          <h2 v-if="content.body.whyMe.heading" class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.whyMe.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.whyMe.description }}</p>
          <p v-if="content.body.whyMe.details" class="text-toned lg:text-lg">{{ content.body.whyMe.details }}</p>
        </div>
      </div>
    </UContainer>

    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div class="text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.cta.heading }}</h2>
          <p class="text-toned lg:text-xl mb-6">{{ content.body.cta.text }}</p>
          <UButton size="lg" to="/contact">{{ content.body.cta.button }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>
