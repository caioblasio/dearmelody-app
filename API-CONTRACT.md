# API Contracts

All endpoints are prefixed with `/api`. Protected routes require a JWT passed in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Authentication

### `POST /api/auth`

**Auth:** Public

Authenticates a user and returns a JWT access token. Also sets a `refresh_token` cookie (HttpOnly, Secure, `SameSite=None`, 14-day expiry) that clients use to obtain new access tokens via `POST /api/token/refresh` without re-entering credentials. Clients must send requests with credentials included (e.g. `fetch(..., { credentials: 'include' })`) for the cookie to be sent/received cross-origin.

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

Registers a new user account.

**Request body**

```json
{
  "email": "user@example.com",
  "password": "secret",
  "first_name": "John",
  "last_name": "Doe"
}
```

| Field        | Type   | Required | Notes                                                                                      |
| ------------ | ------ | -------- | ------------------------------------------------------------------------------------------ |
| `email`      | string | yes      | Must be a valid e-mail; stored lowercase                                                   |
| `password`   | string | yes      | Minimum 12 characters                                                                      |
| `first_name` | string | yes      | —                                                                                          |
| `last_name`  | string | no       | Omit or pass `null` to leave blank                                                         |
| `timezone`   | string | no       | IANA timezone name (e.g. `Europe/Berlin`); defaults to `Europe/Berlin` if omitted or blank |

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
    "email": "This value is not a valid email address.",
    "firstName": "This value should not be blank."
  }
}
```

**Response `409 Conflict`** — e-mail already registered.

```json
{
  "error": "<message>"
}
```

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
      "styles": ["pop", "upbeat"]
    }
  }
]
```

`music` is `null` when no music has been generated for the entry.

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
      "createdAt": "2026-05-01T10:05:00+00:00"
    }
  ]
}
```

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

## `generateStatus` values

| Value         | Meaning                                         |
| ------------- | ----------------------------------------------- |
| `new`         | Record created; generation not yet started      |
| `generating`  | Lyric and audio generation in progress          |
| `downloading` | Audio file is being downloaded to local storage |
| `done`        | Generation complete; `the music` is available   |
| `failed`      | Generation failed                               |
