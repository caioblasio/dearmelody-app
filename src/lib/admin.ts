export const ADMIN_EMAILS = [
  'caioblasio@gmail.com',
  'aaron.barbosa@gmail.com',
  'shinjiiraki@gmail.com',
] as const

const ADMIN_EMAIL_SET = new Set(ADMIN_EMAILS.map((email) => email.toLowerCase()))

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return ADMIN_EMAIL_SET.has(email.trim().toLowerCase())
}
