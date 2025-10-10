<script setup>
import HeroSection from '~/components/home/HeroSection.vue'
import Sponsers from '~/components/home/Sponsers.vue'
import Services from '~/components/home/Services.vue'
import Founder from '~/components/home/Founder.vue'
import Buisness from '~/components/home/Buisness.vue'
import Reviews from '~/components/home/Reviews.vue'
import ContactForm from '~/components/global/ContactForm.vue'

const { locale } = useI18n()
const { data: home, refresh } = await useAsyncData(() => 
  queryCollection('home').where('stem', '=', `home/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
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
