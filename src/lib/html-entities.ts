export function decodeHtmlEntities(value: string): string {
  if (!value || !value.includes('&')) return value

  const doc = new DOMParser().parseFromString(value, 'text/html')
  return doc.documentElement.textContent ?? value
}
