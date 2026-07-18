import { decodeHtmlEntities } from '@/lib/html-entities'

import type { DiaryEntryDetail } from './diary-entry-detail'
import type { DiaryListItem } from './diary-list-item'

export function decodeDiaryListItem(item: DiaryListItem): DiaryListItem {
  return {
    ...item,
    title: decodeHtmlEntities(item.title),
    entry: decodeHtmlEntities(item.entry),
    music: item.music ? { ...item.music, title: decodeHtmlEntities(item.music.title) } : item.music,
  }
}

export function decodeDiaryEntryDetail(detail: DiaryEntryDetail): DiaryEntryDetail {
  return {
    ...detail,
    title: decodeHtmlEntities(detail.title),
    entry: decodeHtmlEntities(detail.entry),
    musics:
      detail.musics?.map((music) => ({
        ...music,
        title: decodeHtmlEntities(music.title),
        lyrics: music.lyrics != null ? decodeHtmlEntities(music.lyrics) : music.lyrics,
      })) ?? detail.musics,
  }
}
