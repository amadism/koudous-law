<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
  const { data: about, refresh } = await useAsyncData(() => 
  queryCollection('about').where('stem', '=', `about/${locale.value}`).first()
)

  watch(locale, () => {
    refresh()
  })

const missionRef = ref(null)
const aboutImageRef = ref(null)
const aboutContentRef = ref(null)
const { fadeInUp, slideInLeft, slideInRight, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (missionRef.value) {
    fadeInUp(missionRef.value.querySelector('.mission-title'))
    
    const paras = missionRef.value.querySelectorAll('.mission-para')
    paras.forEach((para, index) => {
      fadeInUp(para, { delay: 0.1 + (index * 0.1) })
    })
  }
  
  if (aboutImageRef.value) {
    slideInLeft(aboutImageRef.value, { duration: 1.2 })
  }
  
  if (aboutContentRef.value) {
    slideInRight(aboutContentRef.value.querySelector('.about-title'), { delay: 0.1 })
    slideInRight(aboutContentRef.value.querySelector('.about-content'), { delay: 0.2 })
    slideInRight(aboutContentRef.value.querySelector('.about-extra'), { delay: 0.3 })
  }
})
  </script>


<template>
<div>
    <UContainer>
    <div class="py-12">
        <div ref="missionRef">
            <h2 class="mission-title text-xl lg:text-3xl font-bold text-primary mb-8">{{ about.meta.mission.title }}</h2>
            <p class="mission-para mb-4 text-toned lg:text-lg" v-for="paragraph in about.meta.mission.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
    </div>
</UContainer>
<div class="bg-gray-100 dark:bg-[#111] py-4">
    <UContainer class="flex flex-col lg:flex-row lg:items-center gap-4">
            <img ref="aboutImageRef" :src="about.meta.about.image.src" :alt="about.meta.about.image.alt"
            class="rounded" :class="locale === 'de' ? 'h-[340px]' : 'h-[280px]'" />
            <div ref="aboutContentRef">
            <h2 class="about-title text-xl lg:text-3xl font-bold text-primary">{{ about.meta.about.title }}</h2>
            <p class="about-content text-toned lg:text-xl mt-4">{{ about.meta.about.content }}</p>
            <p class="about-extra text-toned lg:text-xl mt-4 italic">{{ about.meta.about.extra }}</p>
            </div>
        </UContainer>
</div>   
</div>
</template>