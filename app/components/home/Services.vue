<template>
    <UContainer>
        <h1 class="text-2xl font-bold mb-2">{{ data.name }}</h1>
        <h2 class="text-2xl font-bold text-primary mb-2">{{ data.title }}</h2>
        <p class="text-lg ">{{ data.subtitle }}</p>
        <div  class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <UCard variant="soft" color="neutral" v-for="card in data.cards" :key="card.title" class="rounded-none border-l-2 border-primary">
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
</script>