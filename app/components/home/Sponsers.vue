<template>
    <div class="w-full py-24">
        <h1 class="px-4 lg:px-0 text-center text-xl font-bold text-primary mb-8">{{ data.title }}</h1>
        <UMarquee pause-on-hover class="w-full bg-[#0a0a0a] p-4" :overlay="false">
            <div v-for="logo in data.logos" :key="logo.url">
                <a :href="logo.url" target="_blank">
                    <img :src="logo.image_url" :alt="logo.name" class="h-16" />
                </a>
            </div>
        </UMarquee>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object
    }
})
</script>