<template>
  <UApp>
    <NuxtLayout>
      <Header />
      <NuxtPage />
      <Footer />
      <LazyWhatsAppWidget />
      <LazyCookieConsent />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
const colorMode = useColorMode();

// onMounted(async () => {
//   const language = process.client ? localStorage.getItem("language") : null;
//   if (language && language !== locale.value) {
//     await setLocale(language);
//   }
// });

// watch(locale, () => {
//   if (process.client) {
//     localStorage.setItem("language", locale.value);
//   }
// });
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