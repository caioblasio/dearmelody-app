# API Contracts

All endpoints are prefixed with `/api`. Protected routes require a JWT passed in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Authentication

### `POST /api/auth`

**Auth:** Public

Authenticates a user and returns a JWT access token. Also sets a `refresh_token` cookie (HttpOnly, Secure, `SameSite=Lax`, 14-day expiry) that clients use to obtain new access tokens via `POST /api/token/refresh` without re-entering credentials. Clients must send requests with credentials included (e.g. `fetch(..., { credentials: 'include' })`) for the cookie to be sent/received across the API/app subdomains. `SameSite=Lax` is sufficient here because the API and frontend are same-site (subdomains of the same registrable domain) — the cookie is still sent on these cross-subdomain requests.

**Request body**

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Response `200 OK`**

```json
{
  "token": "<jwt>"
}
```

Access tokens expire after 15 minutes (`JWT_TOKEN_TTL`).

**Response `401 Unauthorized`** — invalid credentials.

---

### `POST /api/token/refresh`

**Auth:** Refresh-token cookie (`refresh_token`, set by `POST /api/auth`)

Exchanges the `refresh_token` cookie for a new JWT access token. The refresh token is single-use: each call invalidates the previous refresh token and issues a new one via a rotated `refresh_token` cookie. Replaying an already-used or expired refresh token fails.

**Response `200 OK`**

```json
{
  "token": "<jwt>"
}
```

**Response `401 Unauthorized`** — missing, invalid, expired, or already-used refresh token.

```json
{
  "code": 401,
  "message": "JWT Refresh Token Not Found"
}
```

**Response `429 Too Many Requests`** — rate limit exceeded (30 requests/minute per IP).

---

### `POST /api/logout`

**Auth:** Refresh-token cookie (`refresh_token`, set by `POST /api/auth`)

Revokes the current refresh token (deletes it server-side) and clears the `refresh_token` cookie. Does not require a valid (non-expired) JWT access token.

**Response `200 OK`**

```json
{
  "code": 200,
  "message": "The supplied refresh_token has been invalidated."
}
```

**Response `400 Bad Request`** — no `refresh_token` cookie present.

```json
{
  "code": 400,
  "message": "No refresh_token found."
}
```

---

## Users

### `GET /api/user`

**Auth:** JWT

Returns the authenticated user's profile.

**Response `200 OK`**

```json
{
  "id": "<uuid>",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "plan": "free"
}
```

---

### `POST /api/register`

**Auth:** Public

Registers a new user account. Registration is invite-only — a valid, unused `invite_code` must be supplied. Invite codes are generated in bulk by an admin via the `app:invite:generate` console command (see CLAUDE.md) and distributed out-of-band; there is no self-service invite request flow. Each code is single-use and never expires.

**Request body**

```json
{
  "email": "user@example.com",
  "password": "secret",
  "first_name": "John",
  "last_name": "Doe",
  "invite_code": "ZYW64PXAFYREX4ME"
}
```

| Field         | Type   | Required | Notes                                                                                                                                                             |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`       | string | yes      | Must be a valid e-mail; stored lowercase                                                                                                                          |
| `password`    | string | yes      | Minimum 12 characters                                                                                                                                             |
| `first_name`  | string | yes      | —                                                                                                                                                                 |
| `last_name`   | string | no       | Omit or pass `null` to leave blank                                                                                                                                |
| `timezone`    | string | no       | IANA timezone name (e.g. `Europe/Berlin`); defaults to `Europe/Berlin` if omitted or blank                                                                        |
| `invite_code` | string | yes      | Must not be blank; normalized to uppercase. Validity (unknown/already-used) is checked as a business rule, not a field constraint — see the `409` response below. |

**Response `201 Created`**

```json
{
  "id": "<uuid>"
}
```

**Response `422 Unprocessable Entity`** — validation failure (missing/blank field, e.g. `invite_code` omitted).

```json
{
  "errors": {
    "email": "This value is not a valid email address.",
    "firstName": "This value should not be blank.",
    "inviteCode": "This value should not be blank."
  }
}
```

**Response `409 Conflict`** — e-mail already registered, or the invite code is unknown/already used.

```json
{
  "error": "<message>"
}
```

The invite-code error message is deliberately generic (`"Invalid invite code."`) for both "unknown code" and "already used" cases — it does not distinguish the two, to avoid leaking which codes exist/were used.

**Response `429 Too Many Requests`** — rate limit exceeded.

```json
{
  "error": "Too many registration attempts. Please try again later."
}
```

---

## Diary

### `GET /api/diary`

**Auth:** JWT

Returns a paginated list of the authenticated user's diary entries. Each item includes the first associated music track when present.

**Query parameters**

| Parameter   | Type    | Default | Notes                                                                                                                      |
| ----------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `limit`     | integer | 10      | Minimum 1, maximum 100                                                                                                     |
| `offset`    | integer | 0       | Minimum 0                                                                                                                  |
| `mood`      | string  | —       | Optional. Exact match against the entry's mood (case-insensitive). Empty string is ignored.                                |
| `dateStart` | string  | —       | Optional. `YYYY-MM-DD` in the user's timezone. Returns entries created on or after this date (inclusive of the full day).  |
| `dateEnd`   | string  | —       | Optional. `YYYY-MM-DD` in the user's timezone. Returns entries created on or before this date (inclusive of the full day). |

All filter parameters are optional and combine with `AND` logic. Omitting a parameter applies no filter for that field.

**Response `200 OK`**

```json
[
  {
    "id": "<uuid>",
    "title": "My day",
    "mood": "happy",
    "entry": "Today was great.",
    "createdAt": "2026-05-01T10:00:00+00:00",
    "updatedAt": "2026-05-01T10:00:00+00:00",
    "music": {
      "id": 1,
      "title": "Song Title",
      "imageLocation": "https://...",
      "generateStatus": "done",
      "styles": ["pop", "upbeat"],
      "isFavorited": false,
      "shareToken": null
    }
  }
]
```

`music` is `null` when no music has been generated for the entry. `isFavorited` reflects whether the authenticated user has favorited this track (see `POST /api/music/{id}/favorite` below). `shareToken` is the token minted by `POST /api/music/{id}/share`, or `null` if the track hasn't been made public.

**Response `422 Unprocessable Entity`** — invalid filter value (e.g. malformed date).

```json
{
  "errors": {
    "dateStart": "dateStart must be a valid date (YYYY-MM-DD)."
  }
}
```

---

### `GET /api/diary/{id}`

**Auth:** JWT

Returns a single diary entry with all its associated music tracks.

**Path parameters**

| Parameter | Type | Notes |
| --------- | ---- | ----- |
| `id`      | UUID | —     |

**Response `200 OK`**

```json
{
  "id": "<uuid>",
  "title": "My day",
  "mood": "happy",
  "entry": "Today was great.",
  "createdAt": "2026-05-01T10:00:00+00:00",
  "updatedAt": "2026-05-01T10:00:00+00:00",
  "musics": [
    {
      "id": 1,
      "title": "Song Title",
      "service": "suno",
      "imageLocation": "https://...",
      "lyrics": "Verse 1 ...",
      "generateStatus": "done",
      "styles": ["pop", "upbeat"],
      "createdAt": "2026-05-01T10:05:00+00:00",
      "isFavorited": false,
      "shareToken": null
    }
  ]
}
```

`lyrics` has structure markers (e.g. `[intro]`, `[verse]`, `[chorus]`) stripped before being returned — the stored value in the database keeps the markers; stripping happens only on this read path (`DiaryService::stripLyricsTags()`).

`isFavorited` reflects whether the authenticated user has favorited each track (see `POST /api/music/{id}/favorite` below). `shareToken` is the token minted by `POST /api/music/{id}/share`, or `null` if the track hasn't been made public.

`musics` is `null` when no music has been generated for the entry.

**Response `404 Not Found`**

```json
{
  "error": "Not found"
}
```

---

### `POST /api/new_diary`

**Auth:** JWT

Creates a new diary entry for the authenticated user.

**Request body**

```json
{
  "entry": "Today I felt ...",
  "title": "Optional title",
  "music_style": "jazz, piano, melancholic"
}
```

| Field         | Type   | Required | Notes                                                                                                                                                                   |
| ------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entry`       | string | yes      | Must not be blank after sanitization; max 10 000 characters                                                                                                             |
| `title`       | string | no       | Max 255 characters                                                                                                                                                      |
| `music_style` | string | no       | Comma-separated style tags (e.g. `"jazz, piano, melancholic"`). Max 250 characters. When provided, appends `"Style similar to <value>"` to the lyric generation prompt. |

**Response `201 Created`**

```json
{
  "id": "<uuid>"
}
```

**Response `422 Unprocessable Entity`** — validation failure.

```json
{
  "errors": {
    "entry": "This value should not be blank."
  }
}
```

**Response `409 Conflict`** — user already has an entry for today (evaluated in their timezone).

```json
{
  "error": "<message>"
}
```

---

## Music

### `GET /api/music`

**Auth:** JWT

Returns a paginated list of the authenticated user's music tracks across all diary entries, most recently created first.

**Query parameters**

| Parameter | Type    | Default | Notes                  |
| --------- | ------- | ------- | ---------------------- |
| `limit`   | integer | 30      | Minimum 1, maximum 100 |
| `offset`  | integer | 0       | Minimum 0              |

**Response `200 OK`**

```json
[
  {
    "id": 1,
    "title": "Song Title",
    "imageLocation": "https://...",
    "generateStatus": "done",
    "styles": ["pop", "upbeat"],
    "isFavorited": false,
    "shareToken": null
  }
]
```

`isFavorited` reflects whether the authenticated user has favorited each track (see `POST /api/music/{id}/favorite` below). `shareToken` is the token minted by `POST /api/music/{id}/share`, or `null` if the track hasn't been made public.

---

### `GET /api/music/{id}`

**Auth:** JWT

Serves the audio file for a music track owned by the authenticated user inline, with Range request support for seeking.

**Path parameters**

| Parameter | Type    | Notes           |
| --------- | ------- | --------------- |
| `id`      | integer | Music record ID |

**Response `200 OK`** — binary audio file with `Content-Disposition: inline`.

**Response `404 Not Found`**

```json
{
  "error": "Not found"
}
```

---

### `GET /api/music/{id}/stream`

**Auth:** JWT

Streams the audio file for a music track owned by the authenticated user as a chunked response. No Range request support — the full file is pushed in 8 KB chunks. Suitable for direct playback in audio players that do not require seeking.

**Path parameters**

| Parameter | Type    | Notes           |
| --------- | ------- | --------------- |
| `id`      | integer | Music record ID |

**Response `200 OK`** — chunked audio stream. Includes `Content-Type` (detected from the file) and `Content-Length` headers.

**Response `404 Not Found`**

```json
{
  "error": "Not found"
}
```

---

### `POST /api/music/{id}/share`

**Auth:** JWT

Makes a music track owned by the authenticated user publicly accessible by minting a random 32-character share token. One-way — there is no un-publish/revoke endpoint. Idempotent: calling this again on an already-public track returns the same existing token, no rotation.

**Path parameters**

| Parameter | Type    | Notes           |
| --------- | ------- | --------------- |
| `id`      | integer | Music record ID |

**Response `200 OK`**

```json
{
  "shareToken": "aZ3kP9mQxT1vL8wR2nB6cD4fG7hJ0sYe"
}
```

`shareToken` is 32 characters, drawn from `[0-9A-Za-z]` (base62) — safe to embed in a URL with no escaping.

**Response `404 Not Found`** — music does not exist or is not owned by the authenticated user (the two cases are not distinguished).

```json
{
  "error": "Not found"
}
```

---

### `GET /api/music/share/{token}/stream`

**Auth:** Public — no JWT required.

Streams the audio file for a music track that has been made public via `POST /api/music/{id}/share`. Behaves identically to `GET /api/music/{id}/stream` (chunked, no Range support) except lookup is by share token instead of `id` + ownership.

**Path parameters**

| Parameter | Type   | Notes                                                             |
| --------- | ------ | ----------------------------------------------------------------- |
| `token`   | string | 32-character share token returned by `POST /api/music/{id}/share` |

**Response `200 OK`** — chunked audio stream. Includes `Content-Type` (detected from the file) and `Content-Length` headers.

**Response `404 Not Found`** — unknown token, or the track's generation is not yet `done`.

```json
{
  "error": "Not found"
}
```

---

### `POST /api/music/{id}/favorite`

**Auth:** JWT

Favorites a music track owned by the authenticated user. Only the owner's own tracks can be favorited for now (favoriting other users' tracks, e.g. publicly-shared ones, is not yet supported).

**Path parameters**

| Parameter | Type    | Notes           |
| --------- | ------- | --------------- |
| `id`      | integer | Music record ID |

**Response `201 Created`**

```json
{
  "id": 1
}
```

`id` is the new favorite record's own ID, not the music ID.

**Response `404 Not Found`** — music does not exist or is not owned by the authenticated user (the two cases are not distinguished).

```json
{
  "error": "Not found"
}
```

**Response `409 Conflict`** — the track is already favorited by this user.

```json
{
  "error": "Music is already favorited."
}
```

---

### `DELETE /api/music/{id}/favorite`

**Auth:** JWT

Removes a favorite on a music track owned by the authenticated user.

**Path parameters**

| Parameter | Type    | Notes           |
| --------- | ------- | --------------- |
| `id`      | integer | Music record ID |

**Response `204 No Content`** — favorite removed.

**Response `404 Not Found`** — music does not exist, is not owned by the authenticated user, or was never favorited (the cases are not distinguished).

```json
{
  "error": "Not found"
}
```

---

### `GET /api/music/favorites`

**Auth:** JWT

Returns all of the authenticated user's favorited music tracks, most recently favorited first.

**Response `200 OK`**

```json
[
  {
    "id": 1,
    "title": "Song Title",
    "imageLocation": "https://...",
    "generateStatus": "done",
    "styles": ["pop", "upbeat"],
    "isFavorited": true,
    "shareToken": null
  }
]
```

`isFavorited` is always `true` here — every row returned is by definition a favorite of the authenticated user. `shareToken` is the token minted by `POST /api/music/{id}/share`, or `null` if the track hasn't been made public.

---

## Metrics

### `GET /api/metrics/streak`

**Auth:** JWT

Returns a 30-day diary-activity calendar plus the authenticated user's current writing streak. A day counts as written if a diary entry exists for it (regardless of whether music generation succeeded) — matches the same-day check used by `POST /api/new_diary`'s `409` response.

**Response `200 OK`**

```json
{
  "history": [
    { "date": "2026-06-17", "hasEntry": true },
    { "date": "2026-06-18", "hasEntry": false },
    { "date": "2026-07-16", "hasEntry": true }
  ],
  "streak": 62
}
```

`history` is always exactly 30 entries, ordered oldest first and ending with today (in the user's timezone). `date` is a plain `YYYY-MM-DD` calendar day, not a timestamp.

`streak` is the number of consecutive days with an entry, most recent first. It is **not** limited to the 30 days shown in `history` — a streak longer than 30 days is reported in full. It stays active if the most recent entry was yesterday (today not yet written), and only resets to `0` once a full day has passed with no entry.

---

### `GET /api/metrics/dashboard`

**Auth:** JWT

Aggregates metrics for the authenticated user into a single response. Currently wraps `GET /api/metrics/streak`'s data under a `streak` key, `GET /api/metrics/achievements`'s data under an `achievements` key, `GET /api/metrics/weekly-mood`'s data under a `weeklyMood` key, and `GET /api/metrics/weekly-style`'s data under a `weeklyStyle` key; more metric keys will be added here over time as new metric types are built, without changing the existing standalone endpoints.

**Response `200 OK`**

```json
{
  "streak": {
    "history": [
      { "date": "2026-06-17", "hasEntry": true },
      { "date": "2026-06-18", "hasEntry": false },
      { "date": "2026-07-16", "hasEntry": true }
    ],
    "streak": 62
  },
  "achievements": [
    {
      "code": "first_song",
      "name": "First Song",
      "description": "Create your first diary entry.",
      "earned": true,
      "earnedAt": "2026-07-20T08:03:00+00:00"
    },
    {
      "code": "one_week",
      "name": "One Week",
      "description": "Keep a 7-day diary streak.",
      "earned": false,
      "earnedAt": null
    }
  ],
  "weeklyMood": {
    "mood": "melancholic",
    "counts": { "melancholic": 3, "happy": 2, "cozy": 1, "relaxed": 1 }
  },
  "weeklyStyle": {
    "style": "Pop",
    "counts": { "Pop": 3, "Rock": 2, "Electronic": 1 }
  }
}
```

The `streak` value is identical in shape and meaning to the top-level response of `GET /api/metrics/streak` — see above. The `achievements` value is identical in shape and meaning to the top-level `achievements` array of `GET /api/metrics/achievements` — see below. The `weeklyMood` value is identical in shape and meaning to the top-level response of `GET /api/metrics/weekly-mood` — see below. The `weeklyStyle` value is identical in shape and meaning to the top-level response of `GET /api/metrics/weekly-style` — see below.

---

### `GET /api/metrics/achievements`

**Auth:** JWT

Returns all achievement badges with the authenticated user's earned status for each. Achievements are unlocked as a side effect of other actions (diary creation, music generation completing) rather than computed on read — this endpoint only reports current state, it never triggers new unlocks itself.

**Response `200 OK`**

```json
{
  "achievements": [
    {
      "code": "first_song",
      "name": "First Song",
      "description": "Create your first diary entry.",
      "earned": true,
      "earnedAt": "2026-07-20T08:03:00+00:00"
    },
    {
      "code": "one_week",
      "name": "One Week",
      "description": "Keep a 7-day diary streak.",
      "earned": false,
      "earnedAt": null
    },
    {
      "code": "night_owl",
      "name": "Night Owl",
      "description": "Write 5 diary entries between 10pm and 5am.",
      "earned": false,
      "earnedAt": null
    },
    {
      "code": "one_month",
      "name": "One Month",
      "description": "Keep a 30-day diary streak.",
      "earned": false,
      "earnedAt": null
    },
    {
      "code": "full_spectrum",
      "name": "Full Spectrum",
      "description": "Generate a song in every curated style family.",
      "earned": false,
      "earnedAt": null
    },
    {
      "code": "renaissance_composer",
      "name": "Renaissance Composer",
      "description": "Generate a song in every curated sub-style variant.",
      "earned": false,
      "earnedAt": null
    }
  ]
}
```

All 6 achievements are always present in the array, earned or not. `earnedAt` is `null` until earned, then permanently fixed at the moment it was first unlocked (never re-computed or revoked even if the underlying condition later stops holding — e.g. a broken streak does not un-earn `one_week`).

| `code`                 | Unlock condition                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `first_song`           | The user's first diary entry is created.                                                                                              |
| `one_week`             | The user's diary streak (see `GET /api/metrics/streak`) reaches 7.                                                                    |
| `night_owl`            | 5 of the user's diary entries were created between 10pm and 5am, in the user's timezone.                                              |
| `one_month`            | The user's diary streak reaches 30.                                                                                                   |
| `full_spectrum`        | The user has a `done` music track in every curated style family (11 families).                                                        |
| `renaissance_composer` | The user has a `done` music track in every individual curated sub-style variant (184 variants) — a harder tier above `full_spectrum`. |

---

### `GET /api/metrics/weekly-mood`

**Auth:** JWT

Returns the authenticated user's most frequent diary mood over the last 7 calendar days (today plus the prior 6, in the user's timezone), along with a full breakdown of counts per mood.

**Response `200 OK`**

```json
{
  "mood": "melancholic",
  "counts": { "melancholic": 3, "happy": 2, "cozy": 1, "relaxed": 1 }
}
```

`mood` is the most frequent value; on a tie, whichever mood was encountered first wins (not the most recent). Diary entries with no mood yet (music/mood detection not finished or failed) are excluded entirely — they never appear in `counts` and can't be picked as `mood`. If there are no entries (or none with a mood) in the window, this returns `200` with `{"mood": null, "counts": {}}` — never a `404`.

---

### `GET /api/metrics/weekly-style`

**Auth:** JWT

Returns the authenticated user's most frequent curated music style **family** (e.g. `Pop`, `Rock`, `Electronic`) across their completed (`done`) music tracks generated over the last 7 calendar days (today plus the prior 6, in the user's timezone), along with a full breakdown of counts per style. Counts individual tracks, not diary entries — if a user generates more than one song in a day, each counts separately.

**Response `200 OK`**

```json
{
  "style": "Pop",
  "counts": { "Pop": 3, "Rock": 2, "Electronic": 1 }
}
```

`style` is the most frequent value; on a tie, whichever style was encountered first wins (not the most recent). Only tracks with `generateStatus: "done"` **and** a matched curated style are counted — tracks still generating, failed, or whose style text didn't match any curated catalog entry are excluded entirely and can't be picked as `style`. If there are no qualifying tracks in the window, this returns `200` with `{"style": null, "counts": {}}` — never a `404`.

---

## `generateStatus` values

| Value         | Meaning                                         |
| ------------- | ----------------------------------------------- |
| `new`         | Record created; generation not yet started      |
| `generating`  | Lyric and audio generation in progress          |
| `downloading` | Audio file is being downloaded to local storage |
| `done`        | Generation complete; `the music` is available   |
| `failed`      | Generation failed                               |
