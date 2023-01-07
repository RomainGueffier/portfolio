import * as nodemailer from 'nodemailer'

export const Mailer = {
  sendContactEmail: async ({
    fullname,
    phone,
    email,
    message,
  }: ContactData) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASSWORD,
      },
    })

    return await transporter.sendMail({
      from: import.meta.env.CONTACT_SMTP_SENDER,
      to: import.meta.env.CONTACT_SMTP_RECIPIENT,
      subject: 'Contact from your portfolio website',
      text: `You received a email from your portfolio website:\nName: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      html: `<p>
              You received a email from your portfolio website:<br><br>
              <b>Name:</b> ${fullname}<br>
              <b>Email:</b> ${email}<br>
              <b>Phone:</b> ${phone}<br>
              <b>Message:</b> ${message}
            </p>`,
    })
  },
}

type ContactData = {
  fullname: string
  phone: string
  email: string
  message: string
}
