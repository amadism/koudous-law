<template>
  <div class="bg-gray-100 dark:bg-[#111]">
    <UContainer class="py-16 max-w-4xl">
    <div v-if="contact" ref="headerRef" class="space-y-6 text-center md:text-left">
      <h2 class="contact-title text-3xl font-semibold">{{ contact.meta.title }}</h2>
      <p class="contact-subtitle">
        {{ contact.meta.subtitle }}
      </p>
      <p class="contact-desc text-dimmed">
        {{ contact.meta.description }}
      </p>
    </div>

    <UForm v-if="contact" ref="formRef" :schema="schema" :state="form" class="mt-10 space-y-6" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField :label="contact.meta.form.fields.firstName.label" name="firstName" class="w-full">
          <UInput v-model="form.firstName" :placeholder="contact.meta.form.fields.firstName.placeholder" size="xl" class="w-full" />
        </UFormField>

        <UFormField :label="contact.meta.form.fields.lastName.label" name="lastName" class="w-full">
          <UInput v-model="form.lastName" :placeholder="contact.meta.form.fields.lastName.placeholder" size="xl" class="w-full" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField :label="contact.meta.form.fields.email.label" name="email" class="w-full">
          <UInput v-model="form.email" type="email" :placeholder="contact.meta.form.fields.email.placeholder" size="xl" class="w-full" />
        </UFormField>

        <UFormField :label="contact.meta.form.fields.phone.label" name="phone" class="w-full">
          <UInput v-model="form.phone" type="tel" :placeholder="contact.meta.form.fields.phone.placeholder" size="xl" class="w-full" />
        </UFormField>
      </div>

      <UFormField :label="contact.meta.form.fields.expertise.label" name="expertise" class="w-full">
        <USelect
          v-model="form.expertise"
          :items="contact.meta.form.expertiseOptions"
          :placeholder="contact.meta.form.fields.expertise.placeholder"
          size="xl"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="contact.meta.form.fields.message.label" name="message" class="w-full">
        <UTextarea v-model="form.message" :placeholder="contact.meta.form.fields.message.placeholder"  maxlength="1000" size="xl" class="w-full" />
      </UFormField>

      <div>
        <UButton type="submit" size="xl" color="primary" variant="solid" :loading="isSubmitting" :disabled="isSubmitting" class="w-full flex items-center justify-center md:w-auto px-10">
          {{ contact.meta.form.submitButton }}
        </UButton>
      </div>
    </UForm>

    <div v-if="contact" ref="contactInfoRef" class="mt-12 flex flex-col md:flex-row justify-between items-center gap-6  text-center md:text-left">
      <div class="contact-info-item">
        <UIcon name="i-heroicons-map-pin" class="inline-block mr-2 text-primary" />
        <p>{{ contact.meta.contactInfo.address.line1 }}<br />{{ contact.meta.contactInfo.address.line2 }}</p>
      </div>

      <div class="contact-info-item">
        <UIcon name="i-heroicons-envelope" class="inline-block mr-2 text-primary" />
        <p>{{ contact.meta.contactInfo.email.text }}<br /><a :href="`mailto:${contact.meta.contactInfo.email.address}`" class="text-primary hover:underline">{{ contact.meta.contactInfo.email.address }}</a></p>
      </div>

      <a :href="contact.meta.contactInfo.phone.link" class="contact-info-item cursor-pointer">
        <UIcon name="i-heroicons-phone" class="inline-block mr-2 text-primary" />
        <p>{{ contact.meta.contactInfo.phone.text }}<br /><a href="#" class="text-primary hover:underline">{{ contact.meta.contactInfo.phone.linkText }}</a></p>
      </a>
    </div>
  </UContainer>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { locale } = useI18n()
const toast = useToast()

const { data: contact, refresh } = await useAsyncData(() => 
  queryCollection('contact').where('stem', '=', `contact/${locale.value}`).first()
)

watch(locale, () => {
  refresh()
})

const germanMobileRegex = /^(\+49|0)(15\d|16\d|17\d)\d{7,8}$/

const schema = z.object({
  firstName: z.string().min(1, 'First name is required').refine((val) => val.trim().length >= 3, {
    message: 'First name must be at least 3 characters'
  }),
  lastName: z.string().optional(),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(germanMobileRegex, 'Please enter a valid German mobile number (e.g., +4915123456789 or 015123456789)'),
  expertise: z.string().min(1, 'Please select an expertise area'),
  message: z.string().min(1, 'Message is required').refine((val) => val.trim().length >= 21, {
    message: 'Message must be at least 21 characters'
  })
})

type Schema = z.output<typeof schema>

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  expertise: '',
  message: ''
})

const isSubmitting = ref(false)

const headerRef = ref(null)
const formRef = ref(null)
const contactInfoRef = ref(null)
const { fadeInUp, staggerFadeInUp, initScrollTrigger } = useGsapAnimation()

onMounted(() => {
  initScrollTrigger()
  
  if (headerRef.value) {
    fadeInUp(headerRef.value.querySelector('.contact-title'))
    fadeInUp(headerRef.value.querySelector('.contact-subtitle'), { delay: 0.1 })
    fadeInUp(headerRef.value.querySelector('.contact-desc'), { delay: 0.2 })
  }
  
  if (formRef.value) {
    fadeInUp(formRef.value, { delay: 0.3 })
  }
  
  nextTick(() => {
    const items = document.querySelectorAll('.contact-info-item')
    if (items.length > 0) {
      staggerFadeInUp(Array.from(items))
    }
  })
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSubmitting.value = true
  
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'saad@modernice.design',
        subject: 'New Contact Form Message',
        formData: {
          firstName: event.data.firstName.trim(),
          lastName: event.data.lastName || '',
          email: event.data.email,
          phone: event.data.phone,
          expertise: event.data.expertise,
          message: event.data.message.trim()
        }
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to send message')
    }
    
    const data = await response.json()
    
    if (data.success) {
      toast.add({
        title: 'Success!',
        description: 'Your message has been sent successfully. We will get back to you soon.',
        color: 'green',
        timeout: 5000
      })
      
      // Reset form
      form.firstName = ''
      form.lastName = ''
      form.email = ''
      form.phone = ''
      form.expertise = ''
      form.message = ''
    }
  } catch (error) {
    console.error('Error sending message:', error)
    toast.add({
      title: 'Error',
      description: 'Failed to send your message. Please try again later.',
      color: 'red',
      timeout: 5000
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>