import nodemailer from 'nodemailer'
import { defineEventHandler, readBody } from 'h3'
import { renderBossContactEmail, renderUserAcknowledgmentEmail } from '../utils/emailTemplates'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) // { formData }
  const formData = body.formData

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })
  // Build plain text version for boss
  const bossPlainText = `
New Contact Form Submission

From: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Expertise Area: ${formData.expertise}

Message:
${formData.message}
  `.trim()

  // 1) Send to boss
  await transporter.sendMail({
    from: `"Koudous Law" <${process.env.MAIL_USER}>`,
    to: 'saad@modernice.design',
    subject: 'New Contact Form Message',
    text: bossPlainText,
    html: renderBossContactEmail(formData),
  })

  // 2) Send acknowledgment to user
  await transporter.sendMail({
    from: `"Koudous Law" <${process.env.MAIL_USER}>`,
    to: formData.email,
    subject: 'We received your message',
    text: `Hi ${formData.firstName},\n\nThanks for contacting Koudous Law. We’ve received your message and will get back to you soon.\n\n— Koudous Law`,
    html: renderUserAcknowledgmentEmail(formData),
  })

  return { success: true }
})


