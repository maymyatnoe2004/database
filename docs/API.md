# API reference

The API uses Next.js Route Handlers. Responses are JSON and are served from the same application origin.

## `GET /api/health`

Returns application and database-connection readiness. It is deliberately dynamic and runs on the Node.js runtime so it can access MySQL.

### Successful response: `200`

```json
{
  "status": "ok",
  "database": {
    "configured": false,
    "connected": false
  },
  "timestamp": "2026-08-16T12:00:00.000Z"
}
```

When MySQL environment variables are configured and a `SELECT 1` succeeds, both database fields are `true`.

### Degraded response: `503`

```json
{
  "status": "degraded",
  "database": {
    "configured": true,
    "connected": false
  }
}
```

This indicates that credentials exist but the database cannot be reached or authenticated.

## `GET /api/v1/catalog`

Returns temporary seed catalog data while the MySQL schema is pending.

### Response: `200`

```json
{
  "data": {
    "videos": [],
    "creators": []
  },
  "source": "seed"
}
```

## Planned API surface

The exact endpoints and response shapes will be finalized from the supplied table structure. The expected resource areas are:

| Resource | Planned responsibility |
| --- | --- |
| `/api/v1/videos` | List, filter, and retrieve video/set metadata. |
| `/api/v1/creators` | Retrieve creator profiles and follow state. |
| `/api/v1/library` | Return a signed-in user’s saved items and playlists. |
| `/api/v1/follows` | Create or delete creator/channel follows. |
| `/api/v1/playlists` | Create, update, and list playlists. |

Authentication is not implemented yet. Any user-specific endpoint must be protected before use in production.

## API implementation rules

- Validate all request bodies and route/query parameters before querying MySQL.
- Use HTTP `400` for invalid requests, `401` for unauthenticated access, `403` for unauthorized access, `404` for absent records, and `500` for unexpected failures.
- Return stable identifiers and pagination metadata for collection endpoints.
- Do not leak database error messages or connection details in API responses.
