<template>
  <UHeader mode="drawer">
      <template #left>
          <img @click="toHome" v-show="colorMode.value === 'light'" src="/koudous_logo_bright.svg" alt="Logo" class="h-10 cursor-pointer">
          <img @click="toHome" v-show="colorMode.value === 'dark'" src="/koudous_logo.svg" alt="Logo" class="h-10 cursor-pointer">
      </template>

      <div class="flex-1 flex justify-center">
          <div v-if="navigationItems?.length">
              <UNavigationMenu :items="navigationItems" />
          </div>
          <div v-else class="flex items-center gap-4">
              <USkeleton class="h-8 w-24" />
              <USkeleton class="h-8 w-20" />
              <USkeleton class="h-8 w-16" />
              <USkeleton class="h-8 w-12" />
          </div>
      </div>
      

      <template #right>
          <ULocaleSelect variant="soft" v-model="locale" :locales="Object.values(locales)" />
          <UColorModeButton size="lg" />
      </template>

      <template #body>
    <UNavigationMenu :items="navigationItems" orientation="vertical" class="-mx-2.5" />
  </template>

  </UHeader>
</template>

<script setup>
import { watch } from 'vue'
const { t, locales, locale } = useI18n()
const colorMode = useColorMode()
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const { data: navlinks, refresh } = useAsyncData(() => 
  queryCollection('navlinks').where('stem', '=', `navlinks/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

const navigationItems = computed(() => {
  const items = (navlinks.value?.items || []).map((item) => {
    if (item.type === 'group') {
      return {
        label: item.label,
        children: item.children?.map((child) => ({
          label: child.label,
          to: child.path,
        })),
      }
    }

    return {
      label: item.label,
      to: item.path,
    }
  })

  return items
})


const toHome = () => {
  if(route.path === '/') {
  document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
  return
  }
  router.push('/')
}
</script>