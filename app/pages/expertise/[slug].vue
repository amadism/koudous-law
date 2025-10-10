<script setup>
const route = useRoute()
const { locale } = useI18n()


const { data: content, refresh } = await useAsyncData(
  () => route.params.slug,
  () => queryCollection('expertise').where('stem', '=', `expertise/${route.params.slug}/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

watch(() => route.params.slug, () => {
  refresh()
})
</script>

<template>
  <div>
    <div v-if="content?.meta">
      <UContainer>
        <div class="py-12">
          <h1 class="text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.meta.body.title }}</h1>
          <p class="text-toned lg:text-xl mb-8">{{ content.meta.body.intro }}</p>

          <div class="mb-12">
            <h2 v-if="content.meta.body.howIHelp.heading" class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.howIHelp.heading }}</h2>
            <p class="text-toned lg:text-lg mb-4">{{ content.meta.body.howIHelp.description }}</p>
            <p v-if="content.meta.body.howIHelp.details" class="text-toned lg:text-lg">{{ content.meta.body.howIHelp.details }}</p>
          </div>

          <div class="mb-12">
            <h2 v-if="content.meta.body.services.heading" class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.services.heading }}</h2>
            <ul class="list-disc list-inside space-y-2 mb-6">
              <li class="text-toned lg:text-lg" v-for="service in content.meta.body.services.list" :key="service">
                {{ service }}
              </li>
            </ul>
            <p v-if="content.meta.body.services.extra" class="text-toned lg:text-lg mb-4">{{ content.meta.body.services.extra }}</p>
            <p v-if="content.meta.body.services.details" class="text-toned lg:text-lg">{{ content.meta.body.services.details }}</p>
          </div>

          <div class="mb-12">
            <h2 v-if="content.meta.body.whyMe.heading" class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.whyMe.heading }}</h2>
            <p class="text-toned lg:text-lg mb-4">{{ content.meta.body.whyMe.description }}</p>
            <p v-if="content.meta.body.whyMe.details" class="text-toned lg:text-lg">{{ content.meta.body.whyMe.details }}</p>
          </div>
        </div>
      </UContainer>

      <div class="bg-gray-100 dark:bg-[#111] py-12">
        <UContainer>
          <div class="text-center">
            <h2 class="text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.cta.heading }}</h2>
            <p class="text-toned lg:text-xl mb-6">{{ content.meta.body.cta.text }}</p>
            <UButton size="lg" to="/contact">{{ content.meta.body.cta.button }}</UButton>
          </div>
        </UContainer>
      </div>
    </div>
  </div>
</template>
