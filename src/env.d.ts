/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SMTP_HOST: string
  readonly SMTP_PORT: number
  readonly SMTP_USER: string
  readonly SMTP_PASSWORD: string
  readonly CONTACT_SMTP_SENDER: string
  readonly CONTACT_SMTP_RECIPIENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
