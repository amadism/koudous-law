<template>
  <div class="bg-gray-100 dark:bg-[#111]">
    <UContainer class="py-16 max-w-4xl">
    <div v-if="contact" class="space-y-6 text-center md:text-left">
      <h2 class="text-3xl font-semibold">{{ contact.body.title }}</h2>
      <p class="">
        {{ contact.body.subtitle }}
      </p>
      <p class="text-dimmed">
        {{ contact.body.description }}
      </p>
    </div>

    <UForm v-if="contact" class="mt-10 space-y-6" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField :label="contact.body.form.fields.firstName.label" name="firstName" class="w-full">
          <UInput v-model="form.firstName" :placeholder="contact.body.form.fields.firstName.placeholder" size="xl" class="w-full" />
        </UFormField>

        <UFormField :label="contact.body.form.fields.lastName.label" name="lastName" class="w-full">
          <UInput v-model="form.lastName" :placeholder="contact.body.form.fields.lastName.placeholder" size="xl" class="w-full" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField :label="contact.body.form.fields.email.label" name="email" class="w-full">
          <UInput v-model="form.email" type="email" :placeholder="contact.body.form.fields.email.placeholder" size="xl" class="w-full" />
        </UFormField>

        <UFormField :label="contact.body.form.fields.phone.label" name="phone" class="w-full">
          <UInput v-model="form.phone" type="tel" :placeholder="contact.body.form.fields.phone.placeholder" size="xl" class="w-full" />
        </UFormField>
      </div>

      <UFormField :label="contact.body.form.fields.expertise.label" name="expertise" class="w-full">
        <USelect
          v-model="form.expertise"
          :items="contact.body.form.expertiseOptions"
          :placeholder="contact.body.form.fields.expertise.placeholder"
          size="xl"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="contact.body.form.fields.message.label" name="message" class="w-full">
        <UTextarea v-model="form.message" :placeholder="contact.body.form.fields.message.placeholder"  maxlength="1000" size="xl" class="w-full" />
      </UFormField>

      <div>
        <UButton type="submit" size="xl" color="primary" variant="solid" class="w-full flex items-center justify-center md:w-auto px-10">
          {{ contact.body.form.submitButton }}
        </UButton>
      </div>
    </UForm>

    <div v-if="contact" class="mt-12 flex flex-col md:flex-row justify-between items-center gap-6  text-center md:text-left">
      <div>
        <UIcon name="i-heroicons-map-pin" class="inline-block mr-2 text-primary" />
        <p>{{ contact.body.contactInfo.address.line1 }}<br />{{ contact.body.contactInfo.address.line2 }}</p>
      </div>

      <div>
        <UIcon name="i-heroicons-envelope" class="inline-block mr-2 text-primary" />
        <p>{{ contact.body.contactInfo.email.text }}<br /><a :href="`mailto:${contact.body.contactInfo.email.address}`" class="text-primary hover:underline">{{ contact.body.contactInfo.email.address }}</a></p>
      </div>

      <a :href="contact.body.contactInfo.phone.link" class="cursor-pointer">
        <UIcon name="i-heroicons-phone" class="inline-block mr-2 text-primary" />
        <p>{{ contact.body.contactInfo.phone.text }}<br /><a href="#" class="text-primary hover:underline">{{ contact.body.contactInfo.phone.linkText }}</a></p>
      </a>
    </div>
  </UContainer>
  </div>
</template>

<script setup>
import { watch } from 'vue'
const { locale } = useI18n()
const { data: contact, refresh } = await useAsyncData(() => queryCollection('content').path(`/contact/${locale.value}`).first())

watch(locale, () => {
  refresh()
})

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  expertise: contact.value?.body.form.expertiseOptions[0] || '',
  message: ''
})

const onSubmit = () => {
  console.log('Form submitted:', form)
  // you can integrate emailjs, formsubmit, or server API here
}
</script>