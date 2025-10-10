<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: content, refresh } = await useAsyncData(() => queryCollection('content').path(`/expertise/distribution-law/${locale.value}`).first())

watch(locale, () => {
  refresh()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.body.distributionLaw.title }}</h1>
        <p class="text-toned lg:text-xl mb-8">{{ content.body.distributionLaw.intro }}</p>

        <!-- How I Help Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.distributionLaw.howIHelp.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.distributionLaw.howIHelp.mapping }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.distributionLaw.howIHelp.brewing }}</p>
        </div>

        <!-- Key Services Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.distributionLaw.services.heading }}</h2>
          <ul class="list-disc list-inside space-y-2 mb-6">
            <li class="text-toned lg:text-lg" v-for="service in content.body.distributionLaw.services.list" :key="service">
              {{ service }}
            </li>
          </ul>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.distributionLaw.services.extra }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.distributionLaw.services.manufacturer }}</p>
        </div>

        <!-- Why Me Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.distributionLaw.whyMe.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.distributionLaw.whyMe.description }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.distributionLaw.whyMe.strength }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.distributionLaw.whyMe.clientTrust }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.distributionLaw.whyMe.trackRecord }}</p>
        </div>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div class="text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.distributionLaw.cta.heading }}</h2>
          <p class="text-toned lg:text-xl mb-6">{{ content.body.distributionLaw.cta.text }}</p>
          <UButton size="lg" to="/contact">{{ content.body.distributionLaw.cta.button }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>
