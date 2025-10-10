<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: content, refresh } = await useAsyncData(() => queryCollection('content').path(`/expertise/contract-law/${locale.value}`).first())

watch(locale, () => {
  refresh()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.body.contractLaw.title }}</h1>
        <p class="text-toned lg:text-xl mb-8">{{ content.body.contractLaw.intro }}</p>

        <!-- How I Help Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.contractLaw.howIHelp.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.contractLaw.howIHelp.description }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.contractLaw.howIHelp.review }}</p>
        </div>

        <!-- Key Services Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.contractLaw.services.heading }}</h2>
          <ul class="list-disc list-inside space-y-2 mb-6">
            <li class="text-toned lg:text-lg" v-for="service in content.body.contractLaw.services.list" :key="service">
              {{ service }}
            </li>
          </ul>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.contractLaw.services.surface }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.contractLaw.services['licenses '] }}</p>
        </div>

        <!-- Why Me Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.contractLaw.whyMe.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.contractLaw.whyMe.description }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.contractLaw.whyMe.strength }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.contractLaw.whyMe.clientTrust }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.contractLaw.whyMe.trackRecord }}</p>
        </div>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div class="text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.contractLaw.cta.heading }}</h2>
          <p class="text-toned lg:text-xl mb-6">{{ content.body.contractLaw.cta.text }}</p>
          <UButton size="lg" to="/contact">{{ content.body.contractLaw.cta.button }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>
