<template>
    <div class="py-12 lg:py-24 overflow-x-hidden">
        <UContainer class="mb-10 flex flex-col items-center">
            <h1 ref="titleRef" class="text-2xl font-bold mb-2 text-white text-center">{{ data.title }}</h1>
            <h2 ref="subtitleRef" v-if="data.subtitle" class="text-2xl font-bold text-primary mb-2 text-center">{{ data.subtitle }}</h2>
        </UContainer>
        <div ref="carouselRef">
            <UCarousel
                v-slot="{ item }"
                loop
                dots
                arrows
                :autoplay="{delay: 2000}"
                :items="cards"
                :ui="{ 
                    item: 'basis-1/1 lg:basis-1/3',
                    dot: 'w-3 h-3 rounded-full bg-neutral-500/60 transition-colors duration-200'
                }"
                active>
                <UCard variant="soft" color="neutral" class="rounded-lg p-0 mx-2 hover:border-primary transition-all duration-200 border border-neutral-500/60">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                          <img v-if="item.company_logo_url" :src="item.company_logo_url" class="h-8 w-auto max-w-20 object-contain">
                        </div>
                        <div class="flex items-center">
                          <div class="flex flex-col items-end">
                            <h6>{{ item.company }}</h6>
                            <p class="text-gray-400 text-xs">{{ item.country }}</p>
                          </div>
                            <Icon name="tabler:quote" class="text-primary text-3xl ml-2 -mt-3" />
                        </div>
                    </div>
                    
                    <!-- Quote Section -->
                    <div class="mb-4">
                        <p class="text-white text-sm leading-relaxed min-h-[110px]">
                            "{{ item.text }}"
                        </p>
                    </div>
                    
                   <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1">
                        <Icon name="heroicons:star-solid" class="text-primary" v-for="i in item.rating" :key="i" />
                    </div>
                    
                        <a 
                            v-if="item.website_url" 
                            :href="item.website_url" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="inline-flex items-center text-sm text-primary transition-colors duration-200"
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
