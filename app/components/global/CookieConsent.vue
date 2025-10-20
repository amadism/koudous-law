<template>
  <transition name="fade">
    <div v-if="!consented" class="fixed inset-x-0 bottom-0 z-50">
      <div>
        <UCard class="rounded-none backdrop-blur border-t border-gray-200 dark:border-gray-800">
          <UContainer class="flex flex-col md:flex-row md:items-center gap-4">
            <div class="flex-1 text-sm leading-6">
              <p class="font-medium mb-1">{{ cookieConsent.title }}</p>
              <p class="text-gray-600 dark:text-gray-400">{{ cookieConsent.description }}</p>
            </div>
            <div class="flex gap-2 md:justify-end">
              <UButton color="neutral" variant="ghost" @click="reject" size="lg">{{ cookieConsent.decline }}</UButton>
              <UButton color="primary" variant="solid" @click="accept" size="lg">{{ cookieConsent.accept }}</UButton>
            </div>
          </UContainer>
        </UCard>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue'
const { locale } = useI18n()

const { data: cookieConsent, refresh } = await useAsyncData(() => 
  queryCollection('cookieConsent').where('stem', '=', `cookieConsent/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

const STORAGE_KEY = 'cookie_consent_v1'
const consented = ref(true)

onMounted(() => {
  const saved = process.client ? localStorage.getItem(STORAGE_KEY) : null
  consented.value = saved === 'accepted' || saved === 'rejected'
})

const emit = defineEmits(['accept', 'reject'])

function accept() {
  if (process.client) localStorage.setItem(STORAGE_KEY, 'accepted')
  consented.value = true
  emit('accept')
  if (process.client) {
    window.dispatchEvent(new Event('cookie-consent-accepted'))
  }
}

function reject() {
  if (process.client) localStorage.setItem(STORAGE_KEY, 'rejected')
  consented.value = true
  emit('reject')
}
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>


