<script setup>
import { watch } from 'vue'
const route = useRoute()
const { locale } = useI18n()

const { data: content, refresh } = useAsyncData(
  () => route.params.slug,
  () => queryCollection('services').where('stem', '=', `services/${route.params.slug}/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

watch(() => route.params.slug, () => {
  refresh()
})

const headerRef = ref(null)
const section1Ref = ref(null)
const section2Ref = ref(null)
const section3Ref = ref(null)
const ctaRef = ref(null)
const { fadeInUp, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (headerRef.value) {
    fadeInUp(headerRef.value.querySelector('.service-name'), { delay: 0.1 })
    fadeInUp(headerRef.value.querySelector('.service-tagline'), { delay: 0.2 })
  }
  
  if (section1Ref.value) {
    fadeInUp(section1Ref.value.querySelector('.section-title'), { delay: 0.1 })
    const paras = section1Ref.value.querySelectorAll('.section-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.2 + (index * 0.1) })
    })
  }
  
  if (section2Ref.value) {
    fadeInUp(section2Ref.value.querySelector('.section-title'), { delay: 0.1 })
    fadeInUp(section2Ref.value.querySelector('.section-list'), { delay: 0.2 })
    const paras = section2Ref.value.querySelectorAll('.section-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.3 + (index * 0.1) })
    })
  }
  
  if (section3Ref.value) {
    fadeInUp(section3Ref.value.querySelector('.section-title'), { delay: 0.1 })
    const paras = section3Ref.value.querySelectorAll('.section-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.2 + (index * 0.1) })
    })
  }
  
  if (ctaRef.value) {
    fadeInUp(ctaRef.value.querySelector('.cta-heading'), { delay: 0.1 })
    fadeInUp(ctaRef.value.querySelector('.cta-message'), { delay: 0.2 })
    fadeInUp(ctaRef.value.querySelector('.cta-button'), { delay: 0.3 })
  }
})
</script>

<template>
  <div v-if="content?.meta.body">
    <UContainer>
      <div ref="headerRef" class="py-12">
        <h1 class="service-name text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.meta.body.serviceName }}</h1>
        <p class="service-tagline text-toned lg:text-xl mb-8">{{ content.meta.body.tagline }}</p>

        <div ref="section1Ref" class="mb-12">
          <h2 class="section-title text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.whatYouGet.title }}</h2>
          <p class="section-para text-toned lg:text-lg mb-4">{{ content.meta.body.whatYouGet.summary }}</p>
          <p v-if="content.meta.body.whatYouGet.details" class="section-para text-toned lg:text-lg">{{ content.meta.body.whatYouGet.details }}</p>
        </div>

        <div ref="section2Ref" class="mb-12">
          <h2 class="section-title text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.howItWorks.title }}</h2>
          <ul class="section-list list-disc list-inside space-y-2 mb-6">
            <li class="text-toned lg:text-lg" v-for="feature in content.meta.body.howItWorks.features" :key="feature">
              {{ feature }}
            </li>
          </ul>
          <p v-if="content.meta.body.howItWorks.approach" class="section-para text-toned lg:text-lg mb-4">{{ content.meta.body.howItWorks.approach }}</p>
          <p v-if="content.meta.body.howItWorks.timeline" class="section-para text-toned lg:text-lg">{{ content.meta.body.howItWorks.timeline }}</p>
        </div>

        <div ref="section3Ref" class="mb-12">
          <h2 class="section-title text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.idealFor.title }}</h2>
          <p class="section-para text-toned lg:text-lg mb-4">{{ content.meta.body.idealFor.target }}</p>
          <p v-if="content.meta.body.idealFor.benefits" class="section-para text-toned lg:text-lg">{{ content.meta.body.idealFor.benefits }}</p>
        </div>
      </div>
    </UContainer>

    <div class="bg-gray-100 dark:bg-[#111] py-12">
      <UContainer>
        <div ref="ctaRef" class="text-center">
          <h2 class="cta-heading text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.callToAction.heading }}</h2>
          <p class="cta-message text-toned lg:text-xl mb-6">{{ content.meta.body.callToAction.message }}</p>
          <UButton class="cta-button" size="lg" to="/contact">{{ content.meta.body.callToAction.buttonText }}</UButton>
        </div>
      </UContainer>
    </div>
  </div>
</template>

