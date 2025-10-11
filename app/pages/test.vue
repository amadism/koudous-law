<template>
   <UButton @click="sendEmail">Send Email</UButton>
</template>

<script setup>
const sendEmail = async () => {
    const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: 'theoldamad@gmail.com',
            subject: 'Test',
            message: 'Thank you for contacting me'
        })
    })
    
    const data = await response.json()
    console.log(data)
}
</script>