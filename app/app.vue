<template>
  <UApp>
    <NuxtLayout>
      <div v-if="!checking">
        <Header />
        <NuxtPage />
        <Footer />
      </div>

      <div v-else>
        <UContainer
          class="flex flex-col justify-center items-center h-[100dvh]"
        >
          <img
            v-show="colorMode.value === 'light'"
            src="/koudous_logo_bright.svg"
            alt="Logo"
            class="h-10"
          />
          <img
            v-show="colorMode.value === 'dark'"
            src="/koudous_logo.svg"
            alt="Logo"
            class="h-10"
          />
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
