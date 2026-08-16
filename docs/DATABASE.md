# MySQL integration guide

## Current connector

`lib/db.js` provides a server-only MySQL connection pool using `mysql2/promise`. The pool is reused during development to avoid creating a new connection on each hot reload.

The connection is not created unless all required variables are present:

```dotenv
MYSQL_HOST=127.0.0.1
MYSQL_USER=vibeverse_app
MYSQL_DATABASE=vibeverse
```

Optional variables:

```dotenv
MYSQL_PORT=3306
MYSQL_PASSWORD=replace-with-a-secret
MYSQL_CONNECTION_LIMIT=10
```

Copy the repository’s `.env.example` to `.env.local` and set real values locally. `.env.local` is ignored by Git.

## Connection verification

Use the health endpoint after configuring the environment:

```bash
curl http://localhost:3000/api/health
```

The connector uses `SELECT 1` to verify the database. A response with `connected: true` confirms network access and valid credentials; it does not validate application tables.

## Using the pool

Import `db` only in server code, such as a Route Handler or server-side repository module.

```js
import { db } from "@/lib/db";

const [rows] = await db.execute(
  "SELECT id, title FROM videos WHERE creator_id = ? LIMIT ?",
  [creatorId, limit],
);
```

Always use `execute` or parameter placeholders (`?`) for values. Do not concatenate request values into SQL strings.

## Schema handoff checklist

To connect the application to the real database, provide:

1. `CREATE TABLE` statements or a table/column listing for every relevant table.
2. Primary keys, foreign keys, enum/value constraints, and indexes.
3. Which tables represent users, creators, videos, channels, playlists, saved items, and follows.
4. The authentication identifier that should be used for user-owned data.
5. A few realistic sample records or the intended UI fields for each resource.

## Planned repository layer

Once the schema is available, add focused repository modules such as:

```text
lib/repositories/
  videos.js
  creators.js
  library.js
  playlists.js
  follows.js
```

Route Handlers will call those repositories, and the React UI will fetch the versioned API instead of using seed arrays. This keeps SQL, API formatting, and presentation separate.
