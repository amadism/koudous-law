<template>
    <div class="py-12 lg:py-24 overflow-x-hidden">
        <UContainer class="mb-10 flex flex-col items-center">
        <h1 class="text-2xl font-bold mb-2">{{ data.title }}</h1>
        <h2 class="text-2xl font-bold text-primary mb-2 text-center">{{ data.subtitle }}</h2>
    </UContainer>
     <UCarousel
    v-slot="{ item }"
    loop
    dots
    arrows
    auto-scroll
    :items="cards"
    :ui="{ item: 'basis-1/1 lg:basis-1/3' }">
    <UCard variant="soft" color="neutral" class="flex flex-col items-center">
        <p class="text-lg line-clamp-3 mb-2">{{ item.text }}</p>
        <div class="flex items-center gap-1 mb-3">
            <Icon name="heroicons:star-solid" class="text-yellow-500" v-for="i in item.rating" :key="i" />
        </div>
       <div class="flex items-center justify-between w-full">
        <div class="flex items-center gap-2">
        <img :src="item.avatar_url" width="30" height="30" class="rounded-full">
        <h3 class="text-lg font-bold">{{ item.name }}</h3>
        </div>
       <div class="space-y-0.5">
        <p class="text-xs">{{ item.location }}</p>
        <p class="text-xs">{{ item.position }}</p>
       </div>
       </div>
    </UCard>
  </UCarousel>
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
</script>