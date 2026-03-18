import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// In-memory store for verification codes (code → { email, expiresAt })
const verificationCodes = new Map()

export function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function storeCode(email, code) {
  verificationCodes.set(code, { email: email.toLowerCase(), expiresAt: Date.now() + 10 * 60 * 1000 })
}

export function verifyCode(email, code) {
  const entry = verificationCodes.get(code)
  if (!entry) return false
  if (entry.email !== email.toLowerCase()) return false
  if (Date.now() > entry.expiresAt) {
    verificationCodes.delete(code)
    return false
  }
  verificationCodes.delete(code)
  return true
}

export async function sendVerificationEmail({ to, code }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email not configured — skipping verification email')
    return
  }

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #ffffff;">
      <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 32px 24px; text-align: center; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; font-size: 22px; margin: 0;">Vérification de votre email</h1>
        <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 8px 0 0;">Cabinet de Neurologie — Dr. Abir Bouthouri</p>
      </div>
      <div style="padding: 28px 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; text-align: center;">
        <p style="color: #334155; font-size: 15px; margin: 0 0 20px;">Voici votre code de vérification :</p>
        <div style="background: #f8fafc; border: 2px solid #4f46e5; border-radius: 12px; padding: 20px; display: inline-block; margin-bottom: 20px;">
          <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #4f46e5;">${code}</span>
        </div>
        <p style="color: #64748b; font-size: 13px; margin: 0;">Ce code expire dans 10 minutes.</p>
      </div>
    </div>
  `

  await transporter.sendMail({
    from: `"Cabinet Neurologie Dr. Bouthouri" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Code de vérification — ${code}`,
    html,
  })
}

export async function sendConfirmationEmail({ to, patientName, date, time, service }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email not configured — skipping confirmation email')
    return
  }

  const [year, month, day] = date.split('-')
  const dateStr = `${day}/${month}/${year}`

  const websiteUrl = process.env.CLIENT_URL || 'https://neuroclinique.com'

  const html = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%); padding: 40px 24px; text-align: center;">
        <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 16px; display: inline-block; line-height: 64px; margin-bottom: 16px;">
          <span style="font-size: 32px; color: white;">✓</span>
        </div>
        <h1 style="color: white; font-size: 24px; margin: 0; font-weight: 700;">Rendez-vous confirmé !</h1>
        <p style="color: rgba(255,255,255,0.85); font-size: 14px; margin: 8px 0 0;">Votre réservation a bien été enregistrée</p>
      </div>

      <!-- Body -->
      <div style="padding: 32px 28px;">
        <p style="color: #334155; font-size: 15px; margin: 0 0 24px; line-height: 1.6;">
          Bonjour <strong>${patientName}</strong>,<br/>
          Nous vous confirmons votre rendez-vous au cabinet de neurologie <strong>Dr. Abir Bouthouri</strong>.
        </p>

        <!-- Appointment Card -->
        <div style="background: linear-gradient(135deg, #f8fafc, #eef2ff); border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <div style="font-size: 13px; font-weight: 600; color: #4f46e5; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px;">Détails du rendez-vous</div>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">📅 Date</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 600; text-align: right; border-bottom: 1px solid #e2e8f0;">${dateStr}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">🕐 Heure</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 600; text-align: right; border-bottom: 1px solid #e2e8f0;">${time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; border-bottom: 1px solid #e2e8f0;">🏥 Service</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 600; text-align: right; border-bottom: 1px solid #e2e8f0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">📍 Lieu</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: 600; text-align: right;">Centre médical Le Carré Blanc<br/><span style="font-weight: 400; color: #64748b;">8ème étage, bureau B82</span></td>
            </tr>
          </table>
        </div>

        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${websiteUrl}" style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-size: 14px; font-weight: 600; letter-spacing: 0.3px;">
            Visiter notre site
          </a>
        </div>

        <!-- Contact Info -->
        <div style="background: #fefce8; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 16px; margin-bottom: 0;">
          <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 1.5;">
            ⚠️ En cas d'empêchement, merci de nous prévenir au plus tôt.<br/>
            📞 <a href="tel:+21629509598" style="color: #4f46e5; text-decoration: none; font-weight: 600;">29 509 598</a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; padding: 20px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; font-size: 13px; margin: 0 0 4px; font-weight: 600;">Cabinet de Neurologie — Dr. Abir Bouthouri</p>
        <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px;">Avenue Ibn Eljazzar, Sousse</p>
        <a href="${websiteUrl}" style="color: #4f46e5; font-size: 12px; text-decoration: none;">${websiteUrl.replace('https://', '')}</a>
      </div>
    </div>
  `

  await transporter.sendMail({
    from: `"Cabinet Neurologie Dr. Bouthouri" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Rendez-vous confirmé — ${dateStr} à ${time}`,
    html,
  })
}
