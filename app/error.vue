<template>
  <div>
    <div v-if="!checking">
      <UContainer class="flex items-center justify-center h-[100dvh]">
        <div class="flex flex-col items-center text-center gap-6">
          <div class="flex items-center gap-4">
            <Icon name="mdi:alert-circle-outline" class="h-10 w-10 text-primary" />
            <span class="text-3xl font-semibold">404</span>
          </div>

          <h1 class="text-2xl">{{ t.title }}</h1>
          <p class="text-sm text-gray-400 max-w-md">{{ t.description }}</p>

          <div class="flex gap-3">
            <UButton color="primary" :to="'/'">{{ t.home }}</UButton>
            <UButton variant="ghost" @click="goBack">{{ t.back }}</UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <div v-else>
      <UContainer class="flex flex-col justify-center items-center h-[100dvh]">
        <Icon name="eos-icons:three-dots-loading" class="h-20 w-20 text-primary" />
      </UContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { locale, setLocale } = useI18n({ useScope: 'global' })
const checking = ref(true)

const messages = {
  de: {
    title: 'Seite nicht gefunden',
    description: 'Die angeforderte Seite wurde nicht gefunden oder ist nicht mehr verfügbar.',
    home: 'Zur Startseite',
    back: 'Zurück'
  },
  en: {
    title: 'Page not found',
    description: 'The page you are looking for could not be found or no longer exists.',
    home: 'Go home',
    back: 'Go back'
  },
  ja: {
    title: 'ページが見つかりません',
    description: 'お探しのページは見つからないか、すでに削除されています。',
    home: 'ホームへ',
    back: '戻る'
  }
} as const

const t = computed(() => messages[(locale.value as keyof typeof messages) ?? 'en'])

const supported = ['de', 'en', 'ja'] as const
type SupportedLang = typeof supported[number]

onMounted(async () => {
  const language = process.client ? localStorage.getItem('language') : null
  if (language) {
    const lang: SupportedLang = (supported.includes(language as SupportedLang) ? language : 'de') as SupportedLang
    await setLocale(lang)
    checking.value = false
  } else {
    checking.value = false
  }
})

watch(locale, () => {
  localStorage.setItem('language', locale.value as string)
})

const goBack = () => {
  if (history.length > 1) router.back()
  else router.push('/')
}
</script>


