<template>
  <transition name="fade">
    <div v-if="!consented" class="fixed bottom-4 left-4 z-50">
      <UCard variant="soft" class="max-w-sm w-80 bg-white dark:bg-[#141414]">
        <!-- Header -->
        <div class="flex items-center gap-2 mb-3">
          <Icon name="material-symbols:cookie" class="w-5 h-5 text-primary" />
          <h3 class="text-base font-semibold text-gray-900 dark:text-white">{{ cookieConsent?.title || 'Privacy Settings' }}</h3>
        </div>
        
        <!-- Description -->
        <p class="text-gray-600 dark:text-gray-400 text-xs mb-4 leading-relaxed">
          {{ cookieConsent?.description || 'We use cookies to improve your user experience and to optimize our content and services for you.' }}
        </p>
        
        <!-- Cookie Categories -->
        <div class="space-y-3 mb-4">
          <div class="flex items-center gap-2">
            <UCheckbox 
              v-model="cookieSettings.essential" 
              disabled
              color="primary"
              size="sm"
            />
            <div>
              <p class="text-xs font-medium text-gray-900 dark:text-white">{{ cookieConsent?.categories?.essential?.title || 'Essential Cookies' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ cookieConsent?.categories?.essential?.description || 'Required for basic functionality' }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <UCheckbox 
              v-model="cookieSettings.statistics" 
              color="primary"
              size="sm"
            />
            <div>
              <p class="text-xs font-medium text-gray-900 dark:text-white">{{ cookieConsent?.categories?.statistics?.title || 'Statistics' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ cookieConsent?.categories?.statistics?.description || 'Help us understand visitor interactions' }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <UCheckbox 
              v-model="cookieSettings.personalized" 
              color="primary"
              size="sm"
            />
            <div>
              <p class="text-xs font-medium text-gray-900 dark:text-white">{{ cookieConsent?.categories?.personalized?.title || 'Personalized Content' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ cookieConsent?.categories?.personalized?.description || 'Customize content and ads' }}</p>
            </div>
          </div>
          
          <div class="flex items-center gap-2">
            <UCheckbox 
              v-model="cookieSettings.marketing" 
              color="primary"
              size="sm"
            />
            <div>
              <p class="text-xs font-medium text-gray-900 dark:text-white">{{ cookieConsent?.categories?.marketing?.title || 'Marketing' }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ cookieConsent?.categories?.marketing?.description || 'Track visitors for advertising' }}</p>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex gap-2">
          <UButton 
            @click="acceptAll" 
            color="primary" 
            variant="solid" 
            class="flex-1 flex items-center justify-center"
            size="sm"
          >
            {{ cookieConsent?.buttons?.acceptAll || 'Accept All' }}
          </UButton>
          <UButton 
            @click="acceptSelection" 
            color="neutral" 
            variant="outline" 
            class="flex-1 flex items-center justify-center"
            size="sm"
          >
            {{ cookieConsent?.buttons?.acceptSelection || 'Accept Selection' }}
          </UButton>
        </div>
      </UCard>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue'
const { locale } = useI18n()

const { data: cookieConsent, refresh } = useAsyncData(() => 
  queryCollection('cookieConsent').where('stem', '=', `cookieConsent/${locale.value}`).first(),
  {
    server: false,
    default: () => null
  }
)

watch(locale, () => {
  refresh()
}, { immediate: true })

// Debug: Watch for cookieConsent changes
watch(cookieConsent, (newData) => {
  console.log('CookieConsent data changed:', newData)
}, { deep: true })

const STORAGE_KEY = 'cookie_consent_v2'
const consented = ref(true)

// Cookie settings state
const cookieSettings = ref({
  essential: true, // Always required
  statistics: false,
  personalized: false,
  marketing: false
})

onMounted(() => {
  const saved = process.client ? localStorage.getItem(STORAGE_KEY) : null
  if (saved) {
    try {
      const settings = JSON.parse(saved)
      consented.value = true
      cookieSettings.value = { ...cookieSettings.value, ...settings }
    } catch {
      // If parsing fails, show consent modal
      consented.value = false
    }
  } else {
    consented.value = false
  }
})

const emit = defineEmits(['accept', 'reject'])

function acceptAll() {
  cookieSettings.value = {
    essential: true,
    statistics: true,
    personalized: true,
    marketing: true
  }
  saveAndClose()
  emit('accept')
}

function acceptSelection() {
  saveAndClose()
  emit('accept')
}

function saveAndClose() {
  if (process.client) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cookieSettings.value))
    window.dispatchEvent(new Event('cookie-consent-accepted'))
  }
  consented.value = true
}
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>


