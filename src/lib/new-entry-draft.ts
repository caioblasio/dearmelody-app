const STORAGE_KEY = 'dearmelody:new-entry-draft'

export type NewEntryDraft = {
  entry: string
  musicStyle: string
}

export function loadNewEntryDraft(): NewEntryDraft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof (parsed as NewEntryDraft).entry !== 'string' ||
      typeof (parsed as NewEntryDraft).musicStyle !== 'string'
    ) {
      return null
    }

    return {
      entry: (parsed as NewEntryDraft).entry,
      musicStyle: (parsed as NewEntryDraft).musicStyle,
    }
  } catch {
    return null
  }
}

export function saveNewEntryDraft(draft: NewEntryDraft) {
  if (!draft.entry.trim() && !draft.musicStyle.trim()) {
    clearNewEntryDraft()
    return
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
}

export function clearNewEntryDraft() {
  localStorage.removeItem(STORAGE_KEY)
}
