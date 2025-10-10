<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: content, refresh } = await useAsyncData(() => queryCollection('content').path(`/expertise/tenancy-law/${locale.value}`).first())

watch(locale, () => {
  refresh()
})
</script>

<template>
  <div>
    <UContainer>
      <div class="py-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.body.tenancyLaw.title }}</h1>
        <p class="text-toned lg:text-xl mb-8">{{ content.body.tenancyLaw.intro }}</p>

        <!-- How I Help Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.tenancyLaw.howIHelp.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.tenancyLaw.howIHelp.description }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.tenancyLaw.howIHelp.disputes }}</p>
        </div>

        <!-- Key Services Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.tenancyLaw.services.heading }}</h2>
          <ul class="list-disc list-inside space-y-2 mb-6">
            <li class="text-toned lg:text-lg" v-for="service in content.body.tenancyLaw.services.list" :key="service">
              {{ service }}
            </li>
          </ul>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.tenancyLaw.services.basics }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.tenancyLaw.services.deal }}</p>
        </div>

        <!-- Why Me Section -->
        <div class="mb-12">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.tenancyLaw.whyMe.heading }}</h2>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.tenancyLaw.whyMe.description }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.tenancyLaw.whyMe.strength }}</p>
          <p class="text-toned lg:text-lg mb-4">{{ content.body.tenancyLaw.whyMe.clientTrust }}</p>
          <p class="text-toned lg:text-lg">{{ content.body.tenancyLaw.whyMe.trackRecord }}</p>
        </div>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div class="text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.body.tenancyLaw.cta.heading }}</h2>
          <p class="text-toned lg:text-xl mb-6">{{ content.body.tenancyLaw.cta.text }}</p>
          <UButton size="lg" to="/contact">{{ content.body.tenancyLaw.cta.button }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>
