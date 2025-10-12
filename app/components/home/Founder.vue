<template>
    <UContainer class="py-24 flex flex-col lg:flex-row gap-12 lg:gap-4 lg:items-center">
        <div ref="contentRef" class="lg:w-[65%]">
            <h1 class="founder-name text-3xl lg:text-6xl font-bold mb-5">{{ data.name }}</h1>
            <h2 class="founder-title text-xl lg:text-2xl font-bold text-primary mb-5">{{ data.title }}</h2>
            <p class="founder-para text-lg mb-4">{{ data.intro1 }}</p>
            <p class="founder-para text-lg mb-4">{{ data.intro2 }}</p>
            <p class="founder-para text-lg mb-4">{{ data.intro3 }}</p>
            <UButton class="founder-button px-3 lg:px-6 py-2 text-lg lg:mt-4" 
            icon="i-heroicons-phone"
            :to="data.buttonPath">{{ data.buttonText }}</UButton>
        </div>

        <div ref="imageRef" class="w-full lg:w-[35%] lg:flex lg:justify-end">
            <img :src="data.image_url" :alt="data.name" class="max-h-[550px] w-max mx-auto lg:min-w-[550px] lg:object-contain lg:object-right" />
        </div>
    </UContainer>
</template>

<script setup>
defineProps({
    data: {
        type: Object
    }
})

const contentRef = ref(null)
const imageRef = ref(null)
const { slideInLeft, slideInRight, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (contentRef.value) {
    slideInLeft(contentRef.value.querySelector('.founder-name'), { delay: 0.1 })
    slideInLeft(contentRef.value.querySelector('.founder-title'), { delay: 0.2 })
    
    const paras = contentRef.value.querySelectorAll('.founder-para')
    paras.forEach((para, index) => {
      slideInLeft(para, { delay: 0.3 + (index * 0.1) })
    })
    
    slideInLeft(contentRef.value.querySelector('.founder-button'), { delay: 0.6 })
  }
  
  if (imageRef.value) {
    slideInRight(imageRef.value, { duration: 1.2 })
  }
})
</script>