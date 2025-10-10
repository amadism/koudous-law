<template>
 <UApp>
  <NuxtLayout>
    <Header />
    <NuxtPage />
    <Footer />
  </NuxtLayout>
 </UApp>
</template>

<script setup>
import { watch, onMounted } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/global/Footer.vue'
const { locale, setLocale } = useI18n()

onMounted(() => {
  const language = process.client ? localStorage.getItem('language') : null
  if (language) {
    setLocale(language)
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
