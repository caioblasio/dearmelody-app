# API Contracts

All endpoints are prefixed with `/api`. Protected routes require a JWT passed in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Authentication

### `POST /api/auth`

**Auth:** Public

Authenticates a user and returns a JWT token.

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

**Response `401 Unauthorized`** — invalid credentials.

---

## Users

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

| Field        | Type   | Required | Notes                                    |
| ------------ | ------ | -------- | ---------------------------------------- |
| `email`      | string | yes      | Must be a valid e-mail; stored lowercase |
| `password`   | string | yes      | —                                        |
| `first_name` | string | yes      | —                                        |
| `last_name`  | string | no       | Omit or pass `null` to leave blank       |

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

---

## Diary

### `GET /api/diary`

**Auth:** JWT

Returns a paginated list of the authenticated user's diary entries. Each item includes the first associated music track when present.

**Query parameters**

| Parameter | Type    | Default | Notes     |
| --------- | ------- | ------- | --------- |
| `limit`   | integer | 10      | Minimum 1 |
| `offset`  | integer | 0       | Minimum 0 |

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
      "title": "Song Title",
      "location": "https://...",
      "imageLocation": "https://..."
    }
  }
]
```

`music` is `null` when no music has been generated for the entry.

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
      "location": "https://...",
      "imageLocation": "https://...",
      "lyrics": "Verse 1 ...",
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
  "title": "Optional title"
}
```

| Field   | Type   | Required | Notes                                |
| ------- | ------ | -------- | ------------------------------------ |
| `entry` | string | yes      | Must not be blank after sanitization |
| `title` | string | no       | Max 255 characters                   |

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

---
