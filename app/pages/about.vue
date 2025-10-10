<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
  const { data: about, refresh } = await useAsyncData(() => 
  queryCollection('about').where('stem', '=', `about/${locale.value}`).first()
)

  watch(locale, () => {
    refresh()
  })
  </script>


<template>
<div>
    <UContainer>
    <div class="py-12">
        <div>
            <h2 class="text-xl lg:text-3xl font-bold text-primary mb-8">{{ about.meta.mission.title }}</h2>
            <p class="mb-4 text-toned lg:text-lg" v-for="paragraph in about.meta.mission.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </div>
    </div>
</UContainer>
<div class="bg-gray-100 dark:bg-[#111] py-4">
    <UContainer class="flex flex-col lg:flex-row lg:items-center gap-4">
            <img :src="about.meta.about.image.src" :alt="about.meta.about.image.alt"
            class="rounded" :class="locale === 'de' ? 'h-[340px]' : 'h-[280px]'" />
            <div>
            <h2 class="text-xl lg:text-3xl font-bold text-primary">{{ about.meta.about.title }}</h2>
            <p class="text-toned lg:text-xl mt-4">{{ about.meta.about.content }}</p>
            <p class="text-toned lg:text-xl mt-4 italic">{{ about.meta.about.extra }}</p>
            </div>
        </UContainer>
</div>   
</div>
</template>