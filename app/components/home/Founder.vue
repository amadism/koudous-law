<template>
    <UContainer class="py-24 flex flex-col lg:flex-row gap-12 lg:gap-4 lg:items-center">
        <div class="lg:w-[65%]">
            <h1 class="text-3xl lg:text-6xl font-bold mb-5">{{ data.name }}</h1>
            <h2 class="text-xl lg:text-2xl font-bold text-primary mb-5">{{ data.title }}</h2>
            <p class="text-lg mb-4">{{ data.intro1 }}</p>
            <p class="text-lg mb-4">{{ data.intro2 }}</p>
            <p class="text-lg mb-4">{{ data.intro3 }}</p>
            <UButton class="px-3 lg:px-6 py-2 text-lg lg:mt-4" 
            icon="i-heroicons-phone"
            :to="data.buttonPath">{{ data.buttonText }}</UButton>
        </div>

        <div class="w-full lg:w-[35%] lg:flex lg:justify-end">
            <img :src="data.image_url" :alt="data.name" class="max-h-[550px] w-full lg:min-w-[550px] lg:object-contain lg:object-right" />
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