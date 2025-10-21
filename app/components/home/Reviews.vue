<template>
    <div class="py-12 lg:py-24 overflow-x-hidden">
        <UContainer class="mb-10 flex flex-col items-center">
        <h1 ref="titleRef" class="text-2xl font-bold mb-2">{{ data.title }}</h1>
        <h2 ref="subtitleRef" class="text-2xl font-bold text-primary mb-2 text-center">{{ data.subtitle }}</h2>
    </UContainer>
    <div ref="carouselRef">
     <UCarousel
    v-slot="{ item }"
    loop
    dots
    arrows
    auto-scroll
    :items="cards"
    :ui="{ item: 'basis-1/1 lg:basis-1/3' }">
    <UCard variant="soft" color="neutral" class="flex flex-col items-center hover:border-primary border-transparent border-1 hover:border-solid">
        <p class="text-sm mb-2 min-h-[100px]">
          "{{ item.text }}"
        </p>
        <div class="flex items-center gap-1 mb-3">
            <Icon name="heroicons:star-solid" class="text-yellow-500" v-for="i in item.rating" :key="i" />
        </div>
       <div class="flex items-center justify-between w-full">
       <div class="flex items-center gap-2">
        <h3 class="font-bold flex items-center gap-2">
          <span>{{ item.name }}</span>
        </h3>
        </div>
       <div class="space-y-0.5 flex itemscenter gap-1">
        <img v-if="item.company_logo_url" :src="item.company_logo_url" class="rounded-sm h-6 max-w-16">
       </div>
       </div>
       <div class="mt-1 w-full">
         <a 
           v-if="item.website_url" 
           :href="item.website_url" 
           target="_blank" 
           rel="noopener noreferrer"
           class="inline-flex items-center text-sm text-primary hover:text-primary-600 transition-colors duration-200"
         >
           {{ data.webText }}
           <Icon name="heroicons:arrow-top-right-on-square" class="ml-1 h-3 w-3" />
         </a>
       </div>
    </UCard>
  </UCarousel>
  </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object
    }
})

const cards = computed(() => {
    return props.data?.cards
})

const titleRef = ref(null)
const subtitleRef = ref(null)
const carouselRef = ref(null)
const { fadeInUp, scaleIn, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (titleRef.value) {
    fadeInUp(titleRef.value)
  }
  
  if (subtitleRef.value) {
    fadeInUp(subtitleRef.value, { delay: 0.1 })
  }
  
  if (carouselRef.value) {
    scaleIn(carouselRef.value, { delay: 0.3 })
  }
})
</script>


<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}


.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
</style>
