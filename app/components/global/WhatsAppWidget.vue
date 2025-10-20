<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col justify-end items-end">
    <Transition name="chatbox">
      <div v-if="open" ref="chatboxRef" class="w-72 sm:w-80">
        <UCard>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-simple-icons-whatsapp" class="text-green-500" />
              <p class="font-medium">WhatsApp</p>
            </div>
            <UButton icon="i-heroicons-x-mark" variant="ghost" color="neutral" size="xs" @click.stop="closeChatbox" />
          </div>
          <div class="space-y-2">
            <UButton v-for="q in questions" :key="q" block variant="soft" color="neutral" @click="send(q)">{{ q }}</UButton>
          </div>
          <div class="mt-3 flex gap-2">
            <UInput v-model="message" placeholder="Type a message" size="lg" class="flex-1" @keyup.enter="send(message)" />
            <UButton color="primary" @click="send(message)">Send</UButton>
          </div>
        </UCard>
      </div>
    </Transition>

    <UButton v-if="!open" ref="buttonRef" size="xl" color="success" class="rounded-full h-12 w-12 flex items-center justify-center shadow-lg" @click="toggle">
      <UIcon name="i-simple-icons-whatsapp" class="text-2xl" />
    </UButton>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'

const phone = '+493052001249'
const open = ref(false)
const message = ref('')
const questions = [
  'Hello, I would like to book a consultation.',
  'Can you help with immigration law?',
  'What are your office hours?',
]

const chatboxRef = ref(null)
const buttonRef = ref(null)
const { fadeInUp, scaleIn, scaleOut } = useGsapAnimation()

function toggle() { 
  if (open.value) {
    closeChatbox()
  } else {
    openChatbox()
  }
}

function openChatbox() {
  open.value = true
  nextTick(() => {
    if (chatboxRef.value) {
      gsap.fromTo(chatboxRef.value, 
        { 
          opacity: 0, 
          scale: 0.9, 
          y: 10,
          transformOrigin: "bottom right"
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.25, 
          ease: "power2.out"
        }
      )
      
      if (buttonRef.value) {
        gsap.to(buttonRef.value, {
          rotate: 45,
          duration: 0.15,
          ease: "power2.out"
        })
      }
    }
  })
}

function closeChatbox() {
  if (!open.value) return
  
  if (chatboxRef.value) {
    gsap.to(chatboxRef.value, {
      opacity: 0,
      scale: 0.9,
      y: 10,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        open.value = false
      }
    })
    
    if (buttonRef.value) {
      gsap.to(buttonRef.value, {
        rotate: 0,
        duration: 0.15,
        ease: "power2.out"
      })
    }
  } else {
    open.value = false
  }
}

function send(text) {
  if (!text) return
  const urlText = encodeURIComponent(text)
  const url = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${urlText}`
  window.open(url, '_blank')
}
</script>

<style scoped>
.chatbox-enter-active,
.chatbox-leave-active {
  transition: all 0.25s ease;
}

.chatbox-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
  transform-origin: bottom right;
}

.chatbox-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
  transform-origin: bottom right;
}
</style>
