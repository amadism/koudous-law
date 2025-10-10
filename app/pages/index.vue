<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import Sponsers from '~/components/home/Sponsers.vue'
import Services from '~/components/home/Services.vue'
import Founder from '~/components/home/Founder.vue'
import Buisness from '~/components/home/Buisness.vue'
import Reviews from '~/components/home/Reviews.vue'
import ContactForm from '~/components/global/ContactForm.vue'

const { locale } = useI18n()
const { data: home, refresh } = await useAsyncData(() => queryCollection('content').path(`/home/${locale.value}`).first())

watch(locale, () => {
  refresh()
})

const heroSectionData = computed(() => {
  return home.value?.body.HeroSection
})

const sponsersData = computed(() => {
  return home.value?.body.sponsers
})

const servicesData = computed(() => {
  return home.value?.body.services
})

const founderData = computed(() => {
  return home.value?.body.owner
})

const buisnessData = computed(() => {
  return home.value?.body.buisness
})

const reviewsData = computed(() => {
  return home.value?.body.reviews
})
</script>
[]
<template>
  <div v-if="home">
    <HeroSection :data="heroSectionData" />
    <Sponsers :data="sponsersData" />
    <Services :data="servicesData" />
    <Founder :data="founderData" />
    <Buisness :data="buisnessData" />
    <Reviews :data="reviewsData" />
    <ContactForm />
  </div>
  <div v-else>Home not found</div>
</template>
