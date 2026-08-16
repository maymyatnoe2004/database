# VibeVerse

VibeVerse is a Next.js music-discovery interface with Home, Discover, and Library views. It includes a small server-side API and a MySQL-ready connection layer.

## Quick start

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env.local` and provide MySQL credentials when a database is available.
3. Start development: `npm run dev`
4. Open `http://localhost:3000`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the local development server. |
| `npm run lint` | Check the code with ESLint. |
| `npm run build -- --webpack` | Create a production build using Webpack. |
| `npm run start` | Serve a completed production build. |

## Documentation

- [Project architecture](docs/PROJECT.md)
- [API reference](docs/API.md)
- [Database integration](docs/DATABASE.md)
