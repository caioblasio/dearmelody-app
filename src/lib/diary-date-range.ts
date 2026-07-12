export function formatLocalDateYmd(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getLastNDaysRange(days: number): { dateStart: string; dateEnd: string } {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - (days - 1))
  return {
    dateStart: formatLocalDateYmd(start),
    dateEnd: formatLocalDateYmd(end),
  }
}
