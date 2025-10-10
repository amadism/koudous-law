<template>
  <UHeader mode="drawer">
      <template #left>
          <img @click="router.push('/')" v-show="colorMode.value === 'light'" src="/koudous_logo_bright.svg" alt="Logo" class="h-10 cursor-pointer">
          <img @click="router.push('/')" v-show="colorMode.value === 'dark'" src="/koudous_logo.svg" alt="Logo" class="h-10 cursor-pointer">
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
import { useRouter } from 'vue-router'
const router = useRouter()

const { data: navlinks, refresh } = await useAsyncData(() => 
  queryCollection('navlinks').where('stem', '=', `navlinks/${locale.value}`).first()
)

watch(locale, () => {
refresh()
})


const navigationItems = computed(() => {
const items = navlinks.value?.body?.map(item => ({
  label: item.label,
  to: item.path,
  children: item.children?.map(child => ({
    label: child.label,
    to: child.path
  }))
}))

return items
})

</script>