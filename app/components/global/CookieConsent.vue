<template>
  <transition name="fade">
    <div v-if="!consented" class="fixed inset-x-0 bottom-0 z-50">
      <UContainer class="py-4">
        <UCard class="bg-white/90 dark:bg-[#0b0b0b]/90 backdrop-blur border border-gray-200 dark:border-gray-800">
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <div class="flex-1 text-sm leading-6">
              <p class="font-medium mb-1">We use cookies</p>
              <p class="text-gray-600 dark:text-gray-400">We use essential cookies and, with your consent, analytics to improve your experience.</p>
            </div>
            <div class="flex gap-2 md:justify-end">
              <UButton color="neutral" variant="ghost" @click="reject" size="lg">Decline</UButton>
              <UButton color="primary" variant="solid" @click="accept" size="lg">Accept</UButton>
            </div>
          </div>
        </UCard>
      </UContainer>
    </div>
  </transition>
</template>

<script setup>
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


