<template>
  <footer class="border-t border-gray-300 dark:border-[#333] bg-[#eeebeb] dark:bg-[#141414]">
    <UContainer class="py-12">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <h3 class="text-lg font-semibold">{{ content?.body.contact.title }}</h3>
          <div class="mt-6 space-y-4">
            <a :href="`mailto:${content?.body.contact.email}`" class="group flex items-center gap-3 transition-colors">
              <UIcon name="i-heroicons-envelope" class="h-5 w-5 transition-colors group-hover:text-white" />
              <span>{{ content?.body.contact.email }}</span>
            </a>
            <NuxtLink to="/contact" class="group flex items-center gap-3">
              <UIcon name="i-heroicons-phone" class="h-5 w-5 " />
              <span>{{ content?.body.contact.bookCall }}</span>
            </NuxtLink>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold">{{ content?.body.location.title }}</h3>
          <address class="mt-6 not-italic leading-7">
            {{ content?.body.location.address.line1 }}<br />
            {{ content?.body.location.address.line2 }}
          </address>
        </div>
      </div>
    </UContainer>

    <div class="border-t  border-gray-300 dark:border-[#333]">
      <UContainer class="flex flex-col items-start justify-between gap-6 py-6 text-sm md:flex-row">
        <p>{{ content?.body.copyright }}</p>
        <nav class="flex items-center gap-8">
          <NuxtLink to="/legal-notice" class="">{{ content?.body.links.legalNotice }}</NuxtLink>
          <NuxtLink to="/privacy-policy" class="">{{ content?.body.links.privacyPolicy }}</NuxtLink>
        </nav>
      </UContainer>
    </div>
  </footer>
</template>

<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: content, refresh } = await useAsyncData(() => queryCollection('content').path(`/footer/${locale.value}`).first())

watch(locale, () => {
  refresh()
})
</script>


