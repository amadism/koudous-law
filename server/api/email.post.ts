import nodemailer from 'nodemailer'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event) // { to, subject, formData }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  // Build plain text version
  const plainText = `
New Contact Form Submission

From: ${body.formData.firstName} ${body.formData.lastName}
Email: ${body.formData.email}
Phone: ${body.formData.phone}
Expertise Area: ${body.formData.expertise}

Message:
${body.formData.message}
  `.trim()

  await transporter.sendMail({
    from: `"Koudous Law" <${process.env.MAIL_USER}>`,
    to: body.to,
    subject: body.subject,
    text: plainText,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Content -->
          <div style="padding: 9px;">
            <p style="margin: 0 0 20px 0; color: #64748b; font-size: 14px;">You have received a new message from your website contact form.</p>
            
            <!-- Contact Details -->
            <div style="background-color: #f8fafc; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
              <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Contact Information</h2>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #475569; font-size: 14px;">Name:</strong>
                <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 14px;">${body.formData.firstName} ${body.formData.lastName}</p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #475569; font-size: 14px;">Email:</strong>
                <p style="margin: 4px 0 0 0;">
                  <a href="mailto:${body.formData.email}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${body.formData.email}</a>
                </p>
              </div>
              
              <div style="margin-bottom: 12px;">
                <strong style="color: #475569; font-size: 14px;">Phone:</strong>
                <p style="margin: 4px 0 0 0;">
                  <a href="tel:${body.formData.phone}" style="color: #3b82f6; text-decoration: none; font-size: 14px;">${body.formData.phone}</a>
                </p>
              </div>
              
              <div>
                <strong style="color: #475569; font-size: 14px;">Expertise Area:</strong>
                <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 14px;">${body.formData.expertise}</p>
              </div>
            </div>
            
            <!-- Message -->
            <div style="background-color: #f8fafc; border-radius: 6px; padding: 20px;">
              <h2 style="margin: 0 0 12px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Message</h2>
              <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${body.formData.message}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  })

  return { success: true }
})


