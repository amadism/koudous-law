<template>
    <UContainer class="py-6 lg:py-24 flex flex-col-reverse lg:flex-row gap-4 lg:items-center">
        <div ref="imageRef" class="lg:w-1/2">
            <img :src="data.image_url" :alt="data.title" class="max-h-[500px] lg:min-w-[400px] rounded object-center lg:object-left" />
        </div>
        <div ref="contentRef" class="lg:w-1/2">
            <h2 class="business-title text-xl lg:text-2xl font-bold text-primary mb-5">{{ data.title }}</h2>
            <p class="business-para text-lg mb-4">{{ data.subtitle }}</p>
            <p class="business-para text-lg mb-4">{{ data.disc1 }}</p>
            <p class="business-para text-lg mb-4">{{ data.disc2 }}</p>
            <UButton class="business-button px-3 lg:px-6 py-2 text-lg" 
            :to="data.buttonPath">{{ data.buttonText }}</UButton>
        </div>
    </UContainer>
</template>

<script setup>
defineProps({
    data: {
        type: Object
    }
})

const imageRef = ref(null)
const contentRef = ref(null)
const { slideInLeft, slideInRight, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (imageRef.value) {
    slideInLeft(imageRef.value, { duration: 1.2 })
  }
  
  if (contentRef.value) {
    slideInRight(contentRef.value.querySelector('.business-title'), { delay: 0.1 })
    
    const paras = contentRef.value.querySelectorAll('.business-para')
    paras.forEach((para, index) => {
      slideInRight(para, { delay: 0.2 + (index * 0.1) })
    })
    
    slideInRight(contentRef.value.querySelector('.business-button'), { delay: 0.5 })
  }
})
</script>