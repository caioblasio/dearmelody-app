export function scorePasswordStrength(password: string): 0 | 1 | 2 | 3 {
  if (!password) return 0

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++
  if (score === 0) score = 1

  return score as 1 | 2 | 3
}
