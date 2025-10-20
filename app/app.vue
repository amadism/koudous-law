<template>
  <UApp>
    <NuxtLayout>
      <div v-show="!checking">
        <Header />
        <NuxtPage />
        <Footer />
        <WhatsAppWidget />
        <CookieConsent />
      </div>

      <div v-show="checking">
        <UContainer
          class="flex flex-col justify-center items-center h-[100dvh]"
        >
          <Icon
            name="eos-icons:three-dots-loading"
            class="h-20 w-20 text-primary"
          />
        </UContainer>
      </div>
    </NuxtLayout>
  </UApp>
</template>

<script setup>
import { watch, onMounted, ref } from "vue";
import Header from "~/components/Header.vue";
import Footer from "~/components/global/Footer.vue";
import CookieConsent from "~/components/global/CookieConsent.vue";
import WhatsAppWidget from "~/components/global/WhatsAppWidget.vue";
const { locale, setLocale } = useI18n();
const checking = ref(true);
const colorMode = useColorMode();

onMounted(async () => {
  const language = process.client ? localStorage.getItem("language") : null;
  if (language) {
    await setLocale(language);
    checking.value = false;
  } else {
    checking.value = false;
  }
});

watch(locale, () => {
  localStorage.setItem("language", locale.value);
});


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
