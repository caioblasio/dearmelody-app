export type MoodIconKind = 'serene' | 'melancholy' | 'electric' | 'organic' | 'dreamy' | 'cozy' | 'nostalgic'

export type PastMelodyEntry = {
  id: string
  /** Display date, uppercase in designs */
  dateLabel: string
  title: string
  excerpt: string
  moodLabel: string
  moodIcon: MoodIconKind
  /** Accent for mobile list pills */
  listMoodTone: 'serene' | 'surface' | 'container'
  trackTitle: string
  trackArtist: string
  artSrc: string
  favorite?: boolean
  /** YYYY-MM for simple “This Month” filter */
  monthKey: string
}

export const PAST_MELODIES_MOCK: PastMelodyEntry[] = [
  {
    id: '1',
    dateLabel: 'October 24, 2023',
    title: 'Golden Hour Echoes',
    excerpt:
      'The way the light hit the piano keys reminded me of that summer in Marseilles. The minor chords felt heavier today, but in a way that felt like a warm embrace...',
    moodLabel: 'Serene',
    moodIcon: 'serene',
    listMoodTone: 'serene',
    trackTitle: 'Clair de Lune',
    trackArtist: 'Claude Debussy',
    artSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC35UzBQIhWusSQVfgBVzObl4Jo3W1gpuJdjAHcBTJJPC9FvP1mtkj6bRLAWfZBkzn8x4Mx4G7twDGCjXtYQ2KxIZ8FWQE5-5b4bXZ9kBiIsKB3qZQiHVOfGxBDwfqI2O3NHJPVbw5XxspjNrsb7XG-Dr8CycyfpYf3PDm7HYXjtZDXZgaDakATkePEDyut0yaxlLjlcWOwlw9Vp390Aa2kQ0CiKtrHjj48OpEnpJdsk7x648TTTDSJ0Gt3IxuNscsS62COTRscIYY',
    favorite: true,
    monthKey: '2023-10',
  },
  {
    id: '2',
    dateLabel: 'October 22, 2023',
    title: 'Rainy Coffee Musings',
    excerpt:
      'The tempo of the rain matched the beat perfectly. I felt a strange sense of clarity...',
    moodLabel: 'Cozy',
    moodIcon: 'cozy',
    listMoodTone: 'surface',
    trackTitle: 'Midnight City',
    trackArtist: 'M83',
    artSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4IsmuLc8RBZC04LYPihnKX0k3FSgxd1dPvc64Jv4FUdiFF79vYaGulbNxVIdbZWBgeL6YlxjxtiuJHacBzk2RZAjeyZnhgKhe6k_OhQCu_eGAvp0hogQ5srUvkDfZ2ddW4TaXCjZbrc90Tb2Ss1vGOg6p_-H1UhMAMImKQhQQmkj-60R8ean6YDHq0FcqjTUTzcWDNReEPz_dzaJQTVcPlqcJDM4p-HWLDYbzLe8hw7CAIWynzibUP-bTosg27ujWungORUwgOWA',
    monthKey: '2023-10',
  },
  {
    id: '3',
    dateLabel: 'October 21, 2023',
    title: 'Raindrops on the Glass',
    excerpt:
      'Everything felt blue today. Not a sad blue, just a quiet, indigo blue. I found myself looping the same three tracks while staring at the window...',
    moodLabel: 'Melancholy',
    moodIcon: 'melancholy',
    listMoodTone: 'serene',
    trackTitle: 'Blue in Green',
    trackArtist: 'Miles Davis',
    artSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxmNaO3NI7mH3sR8pJIMTllKgVCz_gb8cQaUpJEIjYUvN0z4pMeDhFchy22TNj_SEJ6_edwe4z64BV0VfjzXIaiEqkQKWzmz1SZX9dq36U_8gBQYHDyUl5ZoZQkI5i2pbcmIwaqYxdUFT2fHK5lAl_Vr6fnNH-DhnMNCVzKbZQcpw-ftUc61fMPjGV0IIuqez1bE3YpyKidIKCRD7nIZ9k-4-VNZWKvySZXOm7DYjTpKRtphdIbeTCq2dR2jYblc2waLmv7KxGhDQ',
    monthKey: '2023-10',
  },
  {
    id: '4',
    dateLabel: 'October 19, 2023',
    title: 'Midnight Drive',
    excerpt:
      'Thinking about old friends and paths not taken. The road seemed infinite under the moon...',
    moodLabel: 'Nostalgic',
    moodIcon: 'nostalgic',
    listMoodTone: 'container',
    trackTitle: 'Fast Car',
    trackArtist: 'Tracy Chapman',
    artSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBKaAnRBdJ0fz2309Ufaihtd2QJMSRz9_VmngfCi7o4upi56S-jsuuXp8xOTH_ZOVIOxrSHngWtBAYu1pUA_15jb_V2cBGKgNTfajQMnYeC_WxuKsTRnafaMLEHwKD_IPbp3BHccnxjQGVOp90HON7qUiWZDpXmxf58G1jEh-KsZSI2jOmZ0LnufAGlmWWFzkZg69ybZdNtfqutoUP902Uc4td6UTB38qmYXOneasnYbCFx7WZdh9mPIHOMIyPgbbdOUrA8xbDYmuA',
    favorite: true,
    monthKey: '2023-10',
  },
  {
    id: '5',
    dateLabel: 'October 15, 2023',
    title: 'The Rhythm of Growth',
    excerpt:
      'A burst of energy after weeks of silence. This track made me want to move, to create, to finally finish that sketch. Synchronicity is a strange thing...',
    moodLabel: 'Electric',
    moodIcon: 'electric',
    listMoodTone: 'serene',
    trackTitle: 'Windowlicker',
    trackArtist: 'Aphex Twin',
    artSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOjZn1lQpNi-y6DJsHdDhXjnM-66iTDDPFpyIAjvNrNtpQmSLpQCjNYwMhU0sx1lQj1xnChJ_2D-1EuKzge9uwWZyd6bsCb6DiupiwdnSjrwMfJO6ySyXqXDzbh65CbcSi74OKLhEj30MPZ5GcpGf19TLZ4ac0YduPbc-lLY-xaBPi14kwXiCexNV0iY3Dki0AvryAy7yzcVHNZSzXowparFb1qkz6JCsUpvg7MXhGZxgXhqDoZpHSAANj-Se-JPHOGUepBTOyEs8',
    monthKey: '2023-10',
  },
  {
    id: '6',
    dateLabel: 'September 28, 2023',
    title: 'Midnight Observations',
    excerpt:
      'Cannot sleep. The city is humming. This track matches the frequency of the streetlights outside my window. A shimmering kind of loneliness...',
    moodLabel: 'Dreamy',
    moodIcon: 'dreamy',
    listMoodTone: 'serene',
    trackTitle: 'Stars',
    trackArtist: 'Beach House',
    artSrc:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBce2qHWu8j2AWxFFIeXzDIE8P0yPOB9Hr3oLCa7KfynqZQVB0NnlB2Fpll8QQQteV-_4a1590QSIB9K9z-H0-gYUMQJftI54eChaou0rBohn3w-nG1rS11_xBGcMlZvp7Zet5jEThM33icTUU5tZ_dBMrJxNgRTFOVqh5GSxQS5ZbVn6rawVZmfH5MmQ4xZHeBGXBY9joR6sOA4ySAJJx1NXW49Dq3u3ssTSry5KqBG99-jsowPOV52jg5XCGmWi4BbkfMQJXFzak',
    monthKey: '2023-09',
  },
]
