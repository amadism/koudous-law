<template>
  <div class="bg-gray-100 dark:bg-[#111]">
    <UContainer class="py-16 max-w-4xl">
    <div v-if="contact as any" ref="headerRef" class="space-y-6 text-center md:text-left">
      <h2 class="contact-title text-3xl font-semibold">{{ (contact as any).meta.title }}</h2>
      <p class="contact-subtitle">
        {{ (contact as any).meta.subtitle }}
      </p>
      <p class="contact-desc text-dimmed">
        {{ (contact as any).meta.description }}
      </p>
    </div>

    <UForm v-if="contact as any" ref="formRef" :schema="schema" :state="form" class="mt-10 space-y-6" @submit="onSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField :label="(contact as any).meta.form.fields.firstName.label" name="firstName" class="w-full">
          <UInput v-model="form.firstName" :placeholder="(contact as any).meta.form.fields.firstName.placeholder" size="xl" class="w-full" />
        </UFormField>

        <UFormField :label="(contact as any).meta.form.fields.lastName.label" name="lastName" class="w-full">
          <UInput v-model="form.lastName" :placeholder="(contact as any).meta.form.fields.lastName.placeholder" size="xl" class="w-full" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UFormField :label="(contact as any).meta.form.fields.email.label" name="email" class="w-full">
          <UInput v-model="form.email" type="email" :placeholder="(contact as any).meta.form.fields.email.placeholder" size="xl" class="w-full" />
        </UFormField>

        <UFormField :label="(contact as any).meta.form.fields.phone.label" name="phone" class="w-full">
          <UInput v-model="form.phone" type="tel" :placeholder="(contact as any).meta.form.fields.phone.placeholder" size="xl" class="w-full" />
        </UFormField>
      </div>

      <UFormField :label="(contact as any).meta.form.fields.expertise.label" name="expertise" class="w-full">
        <USelect
          v-model="form.expertise"
          :items="(contact as any).meta.form.expertiseOptions"
          :placeholder="(contact as any).meta.form.fields.expertise.placeholder"
          size="xl"
          class="w-full"
        />
      </UFormField>

      <UFormField :label="(contact as any).meta.form.fields.message.label" name="message" class="w-full">
        <UTextarea v-model="form.message" :placeholder="(contact as any).meta.form.fields.message.placeholder"  maxlength="1000" size="xl" class="w-full" />
      </UFormField>

      <div>
        <UButton type="submit" size="xl" color="primary" variant="solid" :loading="isSubmitting" :disabled="isSubmitting" class="w-full flex items-center justify-center md:w-auto px-10">
          {{ (contact as any).meta.form.submitButton }}
        </UButton>
      </div>
    </UForm>

    <div v-if="contact as any" ref="contactInfoRef" class="mt-12 flex flex-col md:flex-row justify-between items-center gap-6  text-center md:text-left">
      <div class="contact-info-item">
        <UIcon name="i-heroicons-map-pin" class="inline-block mr-2 text-primary" />
        <p>{{ (contact as any).meta.contactInfo.address.line1 }}<br />{{ (contact as any).meta.contactInfo.address.line2 }}</p>
      </div>

      <div class="contact-info-item">
        <UIcon name="i-heroicons-envelope" class="inline-block mr-2 text-primary" />
        <p>{{ (contact as any).meta.contactInfo.email.text }}<br /><a :href="`mailto:${(contact as any).meta.contactInfo.email.address}`" class="text-primary hover:underline">{{ (contact as any).meta.contactInfo.email.address }}</a></p>
      </div>

      <a :href="(contact as any).meta.contactInfo.phone.link" class="contact-info-item cursor-pointer">
        <UIcon name="i-heroicons-phone" class="inline-block mr-2 text-primary" />
        <p>{{ (contact as any).meta.contactInfo.phone.text }}<br /><span class="text-primary hover:underline">{{ (contact as any).meta.contactInfo.phone.linkText }}</span></p>
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

type ContactContent = {
  meta: {
    title: string
    subtitle: string
    description: string
    form: {
      fields: {
        firstName: { label: string; placeholder: string }
        lastName: { label: string; placeholder: string }
        email: { label: string; placeholder: string }
        phone: { label: string; placeholder: string }
        expertise: { label: string; placeholder: string }
        message: { label: string; placeholder: string }
      }
      submitButton: string
      expertiseOptions: string[]
    }
    contactInfo: {
      address: { line1: string; line2: string }
      email: { text: string; address: string }
      phone: { text: string; link: string; linkText: string }
    }
  }
}

const { data: contact, refresh } = await useAsyncData<any>(() => 
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

const headerRef = ref<HTMLElement | null>(null)
const formRef = ref<HTMLElement | null>(null)
const contactInfoRef = ref<HTMLElement | null>(null)
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
        color: 'success',
        
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
      color: 'error',
      
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>