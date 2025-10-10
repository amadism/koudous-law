<template>
    <div class="h-[95dvh] relative w-full overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full">
            <div class="absolute top-0 left-0 w-full h-full bg-black/70 z-10"></div>
            <video src="https://res.cloudinary.com/dheohpnf4/video/upload/v1759998348/WhatsApp_Video_2025-10-09_at_1.20.52_PM_k0g4gy.mp4" autoplay muted loop class="w-full h-full object-cover"></video>
 

        </div>
        <UContainer class="relative flex flex-col justify-center h-full z-12">
        <div class="w-24 lg:w-42 h-2 bg-primary mb-3 rounded"></div>
        <h1 class="text-4xl lg:text-6xl font-bold text-white mb-5 max-w-2xl">{{ data.title }} <span class="text-primary">{{ data.highlight }}</span></h1>
        <h2 class="text-2xl lg:text-4xl font-bold text-white mb-5 max-w-2xl">{{ data.subtitle }}</h2>
        <p class="text-lg lg:text-xl text-white mb-5 max-w-3xl">{{ data.discription }}</p>
        <UButton class="w-max px-4 lg:px-6 py-2 lg:py-3 text-lg text-black lg:text-xl" :to="data.buttonPath">{{ data.buttonText }}</UButton>
        </UContainer>
    </div>
</template>

<script setup>
defineProps({
    data: {
        type: Object    
    }
})
</script>