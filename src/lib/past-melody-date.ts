export function parseDiaryCreatedAt(createdAt: string): Date {
  const parsed = new Date(createdAt)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}
