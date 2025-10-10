<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
  const { data: about, refresh } = await useAsyncData(() => queryCollection('content').path(`/about/${locale.value}`).first())

  watch(locale, () => {
    refresh()
  })
  </script>


<template>
<div>
    <UContainer>
    <div class="py-12">
        <h1 class="text-2xl font-bold">{{ about.body.title }}</h1>
        <div>
            <h2 class="text-xl lg:text-3xl font-bold text-primary mb-8">{{ about.body.mission.title }}</h2>
            <p class="mb-4 text-toned lg:text-lg" v-for="paragraph in about.body.mission.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
    </div>
</UContainer>
<div class="bg-gray-100 dark:bg-[#111] py-4">
    <UContainer class="flex flex-col lg:flex-row lg:items-center gap-4">
            <img :src="about.body.about.image.src" :alt="about.body.about.image.alt"
            class="rounded" :class="locale === 'de' ? 'h-[340px]' : 'h-[280px]'" />
            <div>
            <h2 class="text-xl lg:text-3xl font-bold text-primary">{{ about.body.about.title }}</h2>
            <p class="text-toned lg:text-xl mt-4">{{ about.body.about.content }}</p>
            <p class="text-toned lg:text-xl mt-4 italic">{{ about.body.about.extra }}</p>
            </div>
        </UContainer>
</div>   
</div>
</template>