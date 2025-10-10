<template>
 <UApp>
  <NuxtLayout v-if="!checking">
    <Header />
    <NuxtPage />
    <Footer />
  </NuxtLayout>

  <div v-else>
  <UContainer class="flex justify-center items-center h-[100dvh]">
    <Icon name="eos-icons:loading" class="h-10 w-10 animate-spin text-primary" />
  </UContainer>
 </div>
 </UApp>
 
</template>

<script setup>
import { watch, onMounted, ref } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/global/Footer.vue'
const { locale, setLocale } = useI18n()
const checking = ref(true)

onMounted(async () => {
  const language = process.client ? localStorage.getItem('language') : null
  if (language) {
    await setLocale(language)
    checking.value = false
  } else {
    checking.value = false
  }
})

watch(locale, () => {
  localStorage.setItem('language', locale.value)
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
