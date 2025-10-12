<template>
    <UContainer>
        <h1 ref="nameRef" class="text-2xl font-bold mb-2">{{ data.name }}</h1>
        <h2 ref="titleRef" class="text-2xl font-bold text-primary mb-2">{{ data.title }}</h2>
        <p ref="subtitleRef" class="text-lg ">{{ data.subtitle }}</p>
        <div  class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard variant="soft" color="neutral" v-for="card in data.cards" :key="card.title" class="service-card rounded-none border-l-2 border-primary">
            <h3 class="text-lg font-bold">{{ card.title }}</h3>
            <p class="text-lg line-clamp-2">{{ card.subtitle }}</p>
            <UButton :to="card.buttonPath" variant="soft" class="mt-4" icon="i-heroicons-arrow-right">{{ card.buttonText }}</UButton>
        </UCard>
        </div>
    </UContainer>
</template>

<script setup>
defineProps({
    data: {
        type: Object
    }
})

const nameRef = ref(null)
const titleRef = ref(null)
const subtitleRef = ref(null)
const { fadeInUp, staggerFadeInUp, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (nameRef.value) {
    fadeInUp(nameRef.value, { delay: 0.1 })
  }
  if (titleRef.value) {
    fadeInUp(titleRef.value, { delay: 0.2 })
  }
  if (subtitleRef.value) {
    fadeInUp(subtitleRef.value, { delay: 0.3 })
  }
  
  nextTick(() => {
    const cards = document.querySelectorAll('.service-card')
    if (cards.length > 0) {
      staggerFadeInUp(Array.from(cards), { delay: 0.4 })
    }
  })
})
</script>