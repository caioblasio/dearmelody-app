import type { DiaryListItem } from '@/api/diary/diary-list-item'

/** Fixture data for GET /api/diary (see API-CONTRACT.md). */
export const PAST_MELODIES_MOCK: DiaryListItem[] = [
  {
    id: '11111111-1111-4111-8111-111111111101',
    title: 'Golden Hour Echoes',
    mood: 'serene',
    entry:
      'The way the light hit the piano keys reminded me of that summer in Marseilles. The minor chords felt heavier today, but in a way that felt like a warm embrace...',
    createdAt: '2023-10-24T14:00:00+00:00',
    updatedAt: '2023-10-24T14:00:00+00:00',
    music: {
      title: 'Clair de Lune',
      imageLocation:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC35UzBQIhWusSQVfgBVzObl4Jo3W1gpuJdjAHcBTJJPC9FvP1mtkj6bRLAWfZBkzn8x4Mx4G7twDGCjXtYQ2KxIZ8FWQE5-5b4bXZ9kBiIsKB3qZQiHVOfGxBDwfqI2O3NHJPVbw5XxspjNrsb7XG-Dr8CycyfpYf3PDm7HYXjtZDXZgaDakATkePEDyut0yaxlLjlcWOwlw9Vp390Aa2kQ0CiKtrHjj48OpEnpJdsk7x648TTTDSJ0Gt3IxuNscsS62COTRscIYY',
      generateStatus: 'done',
    },
  },
  {
    id: '11111111-1111-4111-8111-111111111102',
    title: 'Rainy Coffee Musings',
    mood: 'cozy',
    entry: 'The tempo of the rain matched the beat perfectly. I felt a strange sense of clarity...',
    createdAt: '2023-10-22T09:30:00+00:00',
    updatedAt: '2023-10-22T09:30:00+00:00',
    music: null,
  },
  {
    id: '11111111-1111-4111-8111-111111111103',
    title: 'Raindrops on the Glass',
    mood: 'melancholy',
    entry:
      'Everything felt blue today. Not a sad blue, just a quiet, indigo blue. I found myself looping the same three tracks while staring at the window...',
    createdAt: '2023-10-21T18:45:00+00:00',
    updatedAt: '2023-10-21T18:45:00+00:00',
    music: {
      title: 'Blue in Green',
      imageLocation:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAxmNaO3NI7mH3sR8pJIMTllKgVCz_gb8cQaUpJEIjYUvN0z4pMeDhFchy22TNj_SEJ6_edwe4z64BV0VfjzXIaiEqkQKWzmz1SZX9dq36U_8gBQYHDyUl5ZoZQkI5i2pbcmIwaqYxdUFT2fHK5lAl_Vr6fnNH-DhnMNCVzKbZQcpw-ftUc61fMPjGV0IIuqez1bE3YpyKidIKCRD7nIZ9k-4-VNZWKvySZXOm7DYjTpKRtphdIbeTCq2dR2jYblc2waLmv7KxGhDQ',
      generateStatus: 'done',
    },
  },
  {
    id: '11111111-1111-4111-8111-111111111104',
    title: 'Midnight Drive',
    mood: 'nostalgic',
    entry: 'Thinking about old friends and paths not taken. The road seemed infinite under the moon...',
    createdAt: '2023-10-19T23:15:00+00:00',
    updatedAt: '2023-10-19T23:15:00+00:00',
    music: {
      title: 'Fast Car',
      imageLocation:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBKaAnRBdJ0fz2309Ufaihtd2QJMSRz9_VmngfCi7o4upi56S-jsuuXp8xOTH_ZOVIOxrSHngWtBAYu1pUA_15jb_V2cBGKgNTfajQMnYeC_WxuKsTRnafaMLEHwKD_IPbp3BHccnxjQGVOp90HON7qUiWZDpXmxf58G1jEh-KsZSI2jOmZ0LnufAGlmWWFzkZg69ybZdNtfqutoUP902Uc4td6UTB38qmYXOneasnYbCFx7WZdh9mPIHOMIyPgbbdOUrA8xbDYmuA',
      generateStatus: 'done',
    },
  },
  {
    id: '11111111-1111-4111-8111-111111111105',
    title: 'The Rhythm of Growth',
    mood: 'electric',
    entry:
      'A burst of energy after weeks of silence. This track made me want to move, to create, to finally finish that sketch. Synchronicity is a strange thing...',
    createdAt: '2023-10-15T16:20:00+00:00',
    updatedAt: '2023-10-15T16:20:00+00:00',
    music: {
      title: 'Windowlicker',
      imageLocation:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCOjZn1lQpNi-y6DJsHdDhXjnM-66iTDDPFpyIAjvNrNtpQmSLpQCjNYwMhU0sx1lQj1xnChJ_2D-1EuKzge9uwWZyd6bsCb6DiupiwdnSjrwMfJO6ySyXqXDzbh65CbcSi74OKLhEj30MPZ5GcpGf19TLZ4ac0YduPbc-lLY-xaBPi14kwXiCexNV0iY3Dki0AvryAy7yzcVHNZSzXowparFb1qkz6JCsUpvg7MXhGZxgXhqDoZpHSAANj-Se-JPHOGUepBTOyEs8',
      generateStatus: 'done',
    },
  },
  {
    id: '11111111-1111-4111-8111-111111111106',
    title: 'Midnight Observations',
    mood: 'dreamy',
    entry:
      'Cannot sleep. The city is humming. This track matches the frequency of the streetlights outside my window. A shimmering kind of loneliness...',
    createdAt: '2023-09-28T02:00:00+00:00',
    updatedAt: '2023-09-28T02:00:00+00:00',
    music: {
      title: 'Stars',
      imageLocation:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBce2qHWu8j2AWxFFIeXzDIE8P0yPOB9Hr3oLCa7KfynqZQVB0NnlB2Fpll8QQQteV-_4a1590QSIB9K9z-H0-gYUMQJftI54eChaou0rBohn3w-nG1rS11_xBGcMlZvp7Zet5jEThM33icTUU5tZ_dBMrJxNgRTFOVqh5GSxQS5ZbVn6rawVZmfH5MmQ4xZHeBGXBY9joR6sOA4ySAJJx1NXW49Dq3u3ssTSry5KqBG99-jsowPOV52jg5XCGmWi4BbkfMQJXFzak',
      generateStatus: 'generating',
    },
  },
]
