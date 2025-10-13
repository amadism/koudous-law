export type ContactFormData = {
  firstName: string
  lastName?: string
  email: string
  phone: string
  expertise: string
  message: string
}

type RenderBaseOptions = {
  title: string
  preheader?: string
  contentHtml: string
}

const brand = {
  name: 'Koudous Law',
  accent: '#3b82f6',
  text: '#0f172a',
  subtleText: '#475569',
  bg: '#ffffff',
}

export function renderBaseEmail(options: RenderBaseOptions) {
  const preheader = options.preheader ?? ''

  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${escapeHtml(options.title)}</title>
        <style>
          @media (prefers-color-scheme: dark) {
            body { background-color: #0b0f19 !important; }
            .text { color: #e5e7eb !important; }
            .muted { color: #9ca3af !important; }
            .rule { border-color: rgba(255,255,255,0.12) !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:${brand.bg};">
        <div style="display:none; overflow:hidden; line-height:1px; opacity:0; max-height:0; max-width:0;">
          ${escapeHtml(preheader)}
        </div>
        <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="border-collapse:collapse; width:100%; background:#ffffff;">
          <tr>
            <td>
              <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="border-collapse:collapse; width:100%;">
                <tr>
                  <td style="padding:0; background:${brand.accent}; height:4px; line-height:4px; font-size:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:16px 20px;">
                    <div class="muted" style="font-size:12px; letter-spacing:.08em; color:${brand.subtleText}; text-transform:uppercase;">${brand.name}</div>
                    <h1 class="text" style="margin:6px 0 0 0; color:${brand.text}; font-size:18px; font-weight:700;">${escapeHtml(options.title)}</h1>
                  </td>
                </tr>
                <tr>
                  <td class="rule" style="border-top:1px solid rgba(2,6,23,0.08);"></td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;">
                    ${options.contentHtml}
                  </td>
                </tr>
                <tr>
                  <td class="rule" style="border-top:1px solid rgba(2,6,23,0.08);"></td>
                </tr>
                <tr>
                  <td style="padding:12px 20px; font-size:12px; color:${brand.subtleText};">© ${new Date().getFullYear()} ${brand.name}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
  `
}

export function renderBossContactEmail(data: ContactFormData) {
  const contentHtml = `
    <p class="muted" style="margin:0 0 12px 0; color:${brand.subtleText}; font-size:13px;">New message from website contact form.</p>

    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="border-collapse:separate; border-spacing:0 10px;">
      <tr>
        <td style="width:120px; color:${brand.subtleText}; font-size:13px;">Name</td>
        <td style="color:${brand.text}; font-size:14px;">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName ?? '')}</td>
      </tr>
      <tr>
        <td style="color:${brand.subtleText}; font-size:13px;">Email</td>
        <td style="font-size:14px;"><a href="mailto:${escapeAttr(data.email)}" style="color:${brand.accent}; text-decoration:none;">${escapeHtml(data.email)}</a></td>
      </tr>
      <tr>
        <td style="color:${brand.subtleText}; font-size:13px;">Phone</td>
        <td style="font-size:14px;"><a href="tel:${escapeAttr(data.phone)}" style="color:${brand.accent}; text-decoration:none;">${escapeHtml(data.phone)}</a></td>
      </tr>
      <tr>
        <td style="color:${brand.subtleText}; font-size:13px;">Expertise</td>
        <td style="color:${brand.text}; font-size:14px;">${escapeHtml(data.expertise)}</td>
      </tr>
    </table>

    <h2 class="text" style="margin:14px 0 6px 0; color:${brand.text}; font-size:15px; font-weight:600;">Message</h2>
    <p class="text" style="margin:0; color:${brand.text}; font-size:14px; line-height:1.7; white-space:pre-wrap;">${escapeHtml(data.message)}</p>
  `

  return renderBaseEmail({
    title: 'New Contact Form Message',
    preheader: `${data.firstName} ${data.lastName ?? ''} sent a new message`,
    contentHtml,
  })
}

export function renderUserAcknowledgmentEmail(data: ContactFormData) {
  const contentHtml = `
    <p class="text" style="margin:0 0 10px 0; color:${brand.text}; font-size:14px;">Hi ${escapeHtml(data.firstName)},</p>
    <p class="text" style="margin:0 0 12px 0; color:${brand.text}; font-size:14px; line-height:1.7;">
      Thanks for contacting <strong style="color:${brand.text};">${brand.name}</strong>. We’ve received your message and will get back to you soon.
    </p>

    <h2 class="text" style="margin:12px 0 6px 0; color:${brand.text}; font-size:15px; font-weight:600;">Your message</h2>
    <p class="text" style="margin:0; color:${brand.text}; font-size:14px; line-height:1.7; white-space:pre-wrap;">${escapeHtml(data.message)}</p>

    <p class="muted" style="margin:14px 0 0 0; color:${brand.subtleText}; font-size:12px;">If this wasn’t you, please ignore this email.</p>
  `

  return renderBaseEmail({
    title: 'We received your message',
    preheader: 'Thanks for contacting Koudous Law — we’ll be in touch soon',
    contentHtml,
  })
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function escapeAttr(input: string) {
  return escapeHtml(input).replace(/\s/g, '')
}


