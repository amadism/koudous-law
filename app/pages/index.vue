<script setup>
import { useSeoMeta } from '#imports'
const { locale } = useI18n();

import { watch, computed } from 'vue'

const { data: home, refresh } = useAsyncData(() =>
  queryCollection('home').where('stem', '=', `home/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

useSeoMeta({
  title: 'Koudous Law',
})

const heroSectionData = computed(() => {
  return home.value?.meta.heroSection
})

const sponsersData = computed(() => {
  return home.value?.meta.sponsers
})

const servicesData = computed(() => {
  return home.value?.meta.services
})

const founderData = computed(() => {
  return home.value?.meta.owner
})

const buisnessData = computed(() => {
  return home.value?.meta.buisness
})

const reviewsData = computed(() => {
  return home.value?.meta.reviews
})
</script>

<template>
  <div v-if="home" class="overflow-x-hidden">
    <LazyHomeHeroSection :data="heroSectionData" />
    <LazyHomeSponsers :data="sponsersData" />
    <LazyHomeServices :data="servicesData" />
    <LazyHomeFounder :data="founderData" />
    <LazyHomeBuisness :data="buisnessData" />
    <LazyHomeReviews :data="reviewsData" />
    <LazyContactForm />
  </div>
  <div v-else>Home not found</div>
</template>
