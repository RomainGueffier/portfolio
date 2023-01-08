import * as SibApiV3Sdk from '@sendinblue/client'

export default async function sendContactEmail({
  fullname,
  phone,
  email,
  message,
}: ContactData) {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.SB_API_KEY!
  )

  return await apiInstance
    .sendTransacEmail({
      subject: 'Contact from your portfolio website',
      textContent: `You received a email from your portfolio website:\nName: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
      htmlContent: `<!DOCTYPE html><html><body><p>
          You received a email from your portfolio website:<br><br>
          <b>Name:</b> ${fullname}<br>
          <b>Email:</b> ${email}<br>
          <b>Phone:</b> ${phone}<br>
          <b>Message:</b> ${message}
        </p></html></body>`,
      sender: {
        name: 'Portfolio Bot',
        email: process.env.CONTACT_SMTP_SENDER,
      },
      messageVersions: [
        {
          to: [{ email: process.env.CONTACT_SMTP_RECIPIENT!, name: 'Contact' }],
          replyTo: {
            name: 'Portfolio Bot',
            email: process.env.CONTACT_SMTP_SENDER!,
          },
        },
      ],
    })
    .then(
      (data) => {
        return { error: false, message: 'sent' }
      },
      (error) => {
        console.error(error)
        return { error: true, message: 'not sent' }
      }
    )
    .catch((error) => {
      console.error(error)
      return { error: true, message: 'not sent' }
    })
}

type ContactData = {
  fullname: string
  phone: string
  email: string
  message: string
}
