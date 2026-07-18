export type SubGenre = {
  id: string
  label: string
}

export type Genre = {
  id: string
  label: string
  subgenres: SubGenre[]
}

export const GENRES: Genre[] = [
  {
    id: 'pop',
    label: 'Pop',
    subgenres: [
      { id: 'contemporary-pop', label: 'Contemporary Pop' },
      { id: 'electropop', label: 'Electropop' },
      { id: 'synth-pop', label: 'Synth-pop' },
      { id: 'indie-pop', label: 'Indie Pop' },
      { id: 'dream-pop', label: 'Dream Pop' },
      { id: 'bedroom-pop', label: 'Bedroom Pop' },
      { id: 'power-pop', label: 'Power Pop' },
      { id: 'art-pop', label: 'Art Pop' },
    ],
  },
  {
    id: 'rock',
    label: 'Rock',
    subgenres: [
      { id: 'classic-rock', label: 'Classic Rock' },
      { id: 'alternative-rock', label: 'Alternative Rock' },
      { id: 'indie-rock', label: 'Indie Rock' },
      { id: 'hard-rock', label: 'Hard Rock' },
      { id: 'punk-rock', label: 'Punk Rock' },
      { id: 'pop-punk', label: 'Pop Punk' },
      { id: 'post-punk', label: 'Post-Punk' },
      { id: 'gothic-rock', label: 'Gothic Rock' },
      { id: 'grunge', label: 'Grunge' },
      { id: 'psychedelic-rock', label: 'Psychedelic Rock' },
      { id: 'progressive-rock', label: 'Progressive Rock' },
      { id: 'shoegaze', label: 'Shoegaze' },
    ],
  },
  {
    id: 'metal',
    label: 'Metal',
    subgenres: [
      { id: 'heavy-metal', label: 'Heavy Metal' },
      { id: 'thrash-metal', label: 'Thrash Metal' },
      { id: 'doom-metal', label: 'Doom Metal' },
      { id: 'metalcore', label: 'Metalcore' },
      { id: 'symphonic-metal', label: 'Symphonic Metal' },
      { id: 'industrial-metal', label: 'Industrial Metal' },
    ],
  },
  {
    id: 'hip-hop',
    label: 'Hip-Hop',
    subgenres: [
      { id: 'boom-bap', label: 'Boom Bap' },
      { id: 'trap', label: 'Trap' },
      { id: 'lo-fi-hip-hop', label: 'Lo-fi Hip Hop' },
      { id: 'drill', label: 'Drill' },
      { id: 'cloud-rap', label: 'Cloud Rap' },
      { id: 'alternative-hip-hop', label: 'Alternative Hip Hop' },
    ],
  },
  {
    id: 'rnb-soul',
    label: 'R&B/Soul',
    subgenres: [
      { id: 'contemporary-rnb', label: 'Contemporary R&B' },
      { id: 'neo-soul', label: 'Neo-Soul' },
      { id: 'soul', label: 'Soul' },
      { id: 'funk', label: 'Funk' },
      { id: 'disco', label: 'Disco' },
      { id: 'gospel', label: 'Gospel' },
    ],
  },
  {
    id: 'jazz-blues',
    label: 'Jazz/Blues',
    subgenres: [
      { id: 'blues', label: 'Blues' },
      { id: 'jazz-swing', label: 'Jazz Swing' },
      { id: 'bebop', label: 'Bebop' },
      { id: 'cool-jazz', label: 'Cool Jazz' },
      { id: 'jazz-fusion', label: 'Jazz Fusion' },
      { id: 'bossa-nova', label: 'Bossa Nova' },
    ],
  },
  {
    id: 'folk-country',
    label: 'Folk/Country',
    subgenres: [
      { id: 'folk', label: 'Folk' },
      { id: 'singer-songwriter', label: 'Singer-Songwriter' },
      { id: 'indie-folk', label: 'Indie Folk' },
      { id: 'country', label: 'Country' },
      { id: 'bluegrass', label: 'Bluegrass' },
      { id: 'americana', label: 'Americana' },
    ],
  },
  {
    id: 'electronic',
    label: 'Electronic',
    subgenres: [
      { id: 'house', label: 'House' },
      { id: 'deep-house', label: 'Deep House' },
      { id: 'techno', label: 'Techno' },
      { id: 'trance', label: 'Trance' },
      { id: 'drum-and-bass', label: 'Drum & Bass' },
      { id: 'dubstep', label: 'Dubstep' },
      { id: 'uk-garage', label: 'UK Garage' },
      { id: 'ambient', label: 'Ambient' },
      { id: 'downtempo', label: 'Downtempo' },
      { id: 'trip-hop', label: 'Trip-Hop' },
      { id: 'synthwave', label: 'Synthwave' },
      { id: 'ebm', label: 'EBM' },
      { id: 'industrial', label: 'Industrial' },
      { id: 'lo-fi-electronica', label: 'Lo-fi Electronica' },
    ],
  },
  {
    id: 'latin-caribbean-african',
    label: 'Latin/Caribbean/African',
    subgenres: [
      { id: 'reggaeton', label: 'Reggaeton' },
      { id: 'salsa', label: 'Salsa' },
      { id: 'bachata', label: 'Bachata' },
      { id: 'cumbia', label: 'Cumbia' },
      { id: 'samba', label: 'Samba' },
      { id: 'tango', label: 'Tango' },
      { id: 'latin-pop', label: 'Latin Pop' },
      { id: 'reggae', label: 'Reggae' },
      { id: 'dub', label: 'Dub' },
      { id: 'dancehall', label: 'Dancehall' },
      { id: 'afrobeats', label: 'Afrobeats' },
      { id: 'amapiano', label: 'Amapiano' },
    ],
  },
  {
    id: 'asian-mena',
    label: 'Asian/MENA',
    subgenres: [
      { id: 'j-pop', label: 'J-Pop' },
      { id: 'k-pop', label: 'K-Pop' },
      { id: 'city-pop', label: 'City Pop' },
      { id: 'anime-opening', label: 'Anime Opening' },
      { id: 'anime-ballad', label: 'Anime Ballad' },
      { id: 'bollywood-pop', label: 'Bollywood Pop' },
      { id: 'arabic-pop', label: 'Arabic Pop' },
      { id: 'qawwali', label: 'Qawwali' },
    ],
  },
  {
    id: 'classical-cinematic-other',
    label: 'Classical/Cinematic/Other',
    subgenres: [
      { id: 'classical-chamber', label: 'Classical Chamber' },
      { id: 'orchestral-cinematic', label: 'Orchestral Cinematic' },
      { id: 'piano-ballad', label: 'Piano Ballad' },
      { id: 'minimalist', label: 'Minimalist' },
      { id: 'new-age', label: 'New Age' },
      { id: 'musical-theatre', label: 'Musical Theatre' },
      { id: 'spoken-word', label: 'Spoken Word' },
      { id: 'hyperpop', label: 'Hyperpop' },
    ],
  },
]

export function findGenreBySubgenreLabel(label: string): Genre | undefined {
  return GENRES.find((genre) => genre.subgenres.some((sub) => sub.label === label))
}
