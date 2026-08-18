import { db, isDatabaseConfigured } from "../db.js";
import { catalog } from "../catalog.js";

function formatCreator(row) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    genre: row.genre,
    city: row.city,
    avatarColor: row.avatar_color || "red",
    bio: row.bio,
    videoCount: row.video_count || 0,
  };
}

export async function getCreators({ limit = 20, offset = 0 } = {}) {
  if (!isDatabaseConfigured()) {
    return { data: catalog.creators, source: "seed" };
  }

  const [rows] = await db.execute(
    `SELECT c.*, COUNT(v.id) AS video_count
     FROM creators c LEFT JOIN videos v ON v.creator_id = c.id
     GROUP BY c.id
     ORDER BY c.name ASC LIMIT ? OFFSET ?`,
    [Number(limit), Number(offset)],
  );

  return { data: rows.map(formatCreator), source: "database" };
}

export async function getCreatorById(id) {
  if (!isDatabaseConfigured()) {
    const creator = catalog.creators.find((c) => c.id === id);
    return creator ? { data: creator, source: "seed" } : null;
  }

  const [rows] = await db.execute(
    `SELECT c.*, COUNT(v.id) AS video_count
     FROM creators c LEFT JOIN videos v ON v.creator_id = c.id
     WHERE c.id = ? GROUP BY c.id`,
    [id],
  );

  if (rows.length === 0) return null;
  return { data: formatCreator(rows[0]), source: "database" };
}

export async function getCreatorBySlug(slug) {
  if (!isDatabaseConfigured()) {
    const creator = catalog.creators.find((c) => c.id === slug);
    return creator ? { data: creator, source: "seed" } : null;
  }

  const [rows] = await db.execute(
    `SELECT c.*, COUNT(v.id) AS video_count
     FROM creators c LEFT JOIN videos v ON v.creator_id = c.id
     WHERE c.slug = ? GROUP BY c.id`,
    [slug],
  );

  if (rows.length === 0) return null;
  return { data: formatCreator(rows[0]), source: "database" };
}
