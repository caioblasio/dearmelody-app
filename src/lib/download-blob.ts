export function extensionFromMime(type: string): string {
  if (type.includes('mpeg') || type.includes('mp3')) return 'mp3'
  if (type.includes('wav')) return 'wav'
  if (type.includes('ogg')) return 'ogg'
  return 'audio'
}

export function sanitizeDownloadFilename(name: string): string {
  const cleaned = name.replace(/[^\w\s.-]/g, '').trim().replace(/\s+/g, '-')
  return cleaned || 'melody'
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
