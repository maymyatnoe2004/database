# VibeVerse project guide

## Purpose

VibeVerse is a music-discovery product interface. The current implementation is a polished frontend with seed data, client-side interaction states, and a backend foundation for a future MySQL database.

## Technology

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19 and CSS in `app/globals.css` |
| Database driver | `mysql2` promise API |
| Linting | ESLint with `eslint-config-next` |
| Package manager | npm |

## Application routes

| URL | File | Description |
| --- | --- | --- |
| `/` | `app/page.js` | Home: hero, mood filters, trending videos, creators. |
| `/discover` | `app/discover/page.js` | Genre, curator, and scene discovery. |
| `/library` | `app/library/page.js` | Saved content, playlists, and followed channels. |
| `/vibe` | `app/vibe/page.js` | Existing route retained from earlier work. |
| `/vibe/[id]` | `app/vibe/[id]/page.jsx` | Existing dynamic route retained from earlier work. |

## UI structure

`app/components/VibeVerseApp.jsx` is a client component shared by the three primary pages. It controls local UI state for:

- selected moods;
- active Library tab;
- follow/unfollow controls;
- lightweight play and action notifications.

The component currently draws content from in-file seed arrays. API-backed content should replace these arrays after the MySQL schema is supplied.

## Layout and scrolling

On desktop, `.vv-shell` fills the viewport (`100dvh`) and hides outer-body scrolling. `.main-content` is the explicit vertical scroll container, while the sidebar remains visible. On narrow screens (660px and below), the layout converts to document scrolling for better mobile behavior.

## Directory map

```text
app/
  api/                 Route Handlers for JSON APIs
  components/          Reusable client-side UI
  discover/            Discover route
  library/             Library route
  page.js              Home route
  globals.css          Global style system and responsive layout
lib/
  catalog.js           Temporary seed data for APIs
  db.js                MySQL pool and connection verification
docs/                  Developer documentation
```

## Development standards

- Keep credentials only in `.env.local`; do not prefix database variables with `NEXT_PUBLIC_`.
- Add API logic through App Router Route Handlers under `app/api`.
- Keep raw SQL and database mapping outside React components.
- Use parameterized queries through `mysql2`; never construct SQL with interpolated user input.
- Run `npm run lint` and `npm run build -- --webpack` before merging changes.
