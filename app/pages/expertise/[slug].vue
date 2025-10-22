<script setup>
const route = useRoute()
const { locale } = useI18n()

const { data: content, refresh } = useAsyncData(
  () => route.params.slug,
  () => queryCollection('expertise').where('stem', '=', `expertise/${route.params.slug}/${locale.value}`).first()
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
    fadeInUp(headerRef.value.querySelector('.expertise-title'), { delay: 0.1 })
    fadeInUp(headerRef.value.querySelector('.expertise-intro'), { delay: 0.2 })
  }
  
  if (section1Ref.value) {
    const heading = section1Ref.value.querySelector('.section-heading')
    if (heading) fadeInUp(heading, { delay: 0.1 })
    const paras = section1Ref.value.querySelectorAll('.section-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.2 + (index * 0.1) })
    })
  }
  
  if (section2Ref.value) {
    const heading = section2Ref.value.querySelector('.section-heading')
    if (heading) fadeInUp(heading, { delay: 0.1 })
    fadeInUp(section2Ref.value.querySelector('.section-list'), { delay: 0.2 })
    const paras = section2Ref.value.querySelectorAll('.section-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.3 + (index * 0.1) })
    })
  }
  
  if (section3Ref.value) {
    const heading = section3Ref.value.querySelector('.section-heading')
    if (heading) fadeInUp(heading, { delay: 0.1 })
    const paras = section3Ref.value.querySelectorAll('.section-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.2 + (index * 0.1) })
    })
  }
  
  if (ctaRef.value) {
    fadeInUp(ctaRef.value.querySelector('.cta-heading'), { delay: 0.1 })
    fadeInUp(ctaRef.value.querySelector('.cta-text'), { delay: 0.2 })
    fadeInUp(ctaRef.value.querySelector('.cta-button'), { delay: 0.3 })
  }
})
</script>

<template>
  <div>
    <div v-if="content?.meta.body">
      <UContainer>
        <div class="py-12">
          <div ref="headerRef">
            <h1 class="expertise-title text-3xl lg:text-4xl font-bold text-primary mb-6">{{ content.meta.body.title }}</h1>
            <p class="expertise-intro text-toned lg:text-xl mb-8">{{ content.meta.body.intro }}</p>
          </div>

          <div ref="section1Ref" class="mb-12">
            <h2 v-if="content.meta.body.howIHelp.heading" class="section-heading text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.howIHelp.heading }}</h2>
            <p class="section-para text-toned lg:text-lg mb-4">{{ content.meta.body.howIHelp.description }}</p>
            <p v-if="content.meta.body.howIHelp.details" class="section-para text-toned lg:text-lg">{{ content.meta.body.howIHelp.details }}</p>
          </div>

          <div ref="section2Ref" class="mb-12">
            <h2 v-if="content.meta.body.services.heading" class="section-heading text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.services.heading }}</h2>
            <ul class="section-list list-disc list-inside space-y-2 mb-6">
              <li class="text-toned lg:text-lg" v-for="service in content.meta.body.services.list" :key="service">
                {{ service }}
              </li>
            </ul>
            <p v-if="content.meta.body.services.extra" class="section-para text-toned lg:text-lg mb-4">{{ content.meta.body.services.extra }}</p>
            <p v-if="content.meta.body.services.details" class="section-para text-toned lg:text-lg">{{ content.meta.body.services.details }}</p>
          </div>

          <div ref="section3Ref" class="mb-12">
            <h2 v-if="content.meta.body.whyMe.heading" class="section-heading text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.whyMe.heading }}</h2>
            <p class="section-para text-toned lg:text-lg mb-4">{{ content.meta.body.whyMe.description }}</p>
            <p v-if="content.meta.body.whyMe.details" class="section-para text-toned lg:text-lg">{{ content.meta.body.whyMe.details }}</p>
          </div>
        </div>
      </UContainer>

      <div class="bg-gray-100 dark:bg-[#111] py-12">
        <UContainer>
          <div ref="ctaRef" class="text-center">
            <h2 class="cta-heading text-2xl lg:text-3xl font-bold text-primary mb-4">{{ content.meta.body.cta.heading }}</h2>
            <p class="cta-text text-toned lg:text-xl mb-6">{{ content.meta.body.cta.text }}</p>
            <UButton class="cta-button" size="lg" to="/contact">{{ content.meta.body.cta.button }}</UButton>
          </div>
        </UContainer>
      </div>
    </div>
  </div>
</template>
