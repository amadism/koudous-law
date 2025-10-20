<template>
  <div class="fixed bottom-6 right-6 z-50">
    <div v-if="open" class="mb-3 w-72 sm:w-80">
      <UCard>
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-simple-icons-whatsapp" class="text-green-500" />
            <p class="font-medium">WhatsApp</p>
          </div>
          <UButton icon="i-heroicons-x-mark" variant="ghost" color="neutral" size="xs" @click="open=false" />
        </div>
        <div class="space-y-2">
          <UButton v-for="q in questions" :key="q" block variant="soft" color="neutral" @click="send(q)">{{ q }}</UButton>
        </div>
        <div class="mt-3 flex gap-2">
          <UInput v-model="message" placeholder="Type a message" size="lg" class="flex-1" @keyup.enter="send(message)" />
          <UButton color="primary" @click="send(message)">Send</UButton>
        </div>
      </UCard>
    </div>

    <UButton size="xl" color="primary" class="rounded-full h-14 w-14 shadow-lg" @click="toggle">
      <UIcon name="i-simple-icons-whatsapp" class="text-2xl" />
    </UButton>
  </div>
</template>

<script setup>
const phone = '+493052001249'
const open = ref(false)
const message = ref('')
const questions = [
  'Hello, I would like to book a consultation.',
  'Can you help with immigration law?',
  'What are your office hours?',
]

function toggle() { open.value = !open.value }

function send(text) {
  if (!text) return
  const urlText = encodeURIComponent(text)
  const url = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${urlText}`
  window.open(url, '_blank')
}
</script>


