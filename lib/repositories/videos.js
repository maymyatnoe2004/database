import { db, isDatabaseConfigured } from "../db.js";
import { catalog } from "../catalog.js";

function formatVideo(row) {
  return {
    id: row.id,
    title: row.title,
    creator: row.creator_name || row.creator,
    creatorId: row.creator_id,
    plays: row.plays,
    duration: row.duration,
    mood: row.mood,
    tone: row.tone || "magenta",
    description: row.description,
    publishedAt: row.published_at,
  };
}

export async function getVideos({ mood, limit = 20, offset = 0 } = {}) {
  if (!isDatabaseConfigured()) {
    let items = catalog.videos;
    if (mood && mood !== "For you") {
      items = items.filter((v) => v.mood === mood);
    }
    return { data: items.map((v) => ({ ...v, tone: "magenta" })), source: "seed" };
  }

  let sql = `SELECT v.*, c.name AS creator_name FROM videos v JOIN creators c ON v.creator_id = c.id`;
  const params = [];

  if (mood) {
    sql += " WHERE v.mood = ?";
    params.push(mood);
  }

  sql += " ORDER BY v.plays DESC LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  const [rows] = await db.execute(sql, params);
  return { data: rows.map(formatVideo), source: "database" };
}

export async function getVideoById(id) {
  if (!isDatabaseConfigured()) {
    const video = catalog.videos.find((v) => v.id === id);
    return video ? { data: { ...video, tone: "magenta" }, source: "seed" } : null;
  }

  const [rows] = await db.execute(
    `SELECT v.*, c.name AS creator_name, c.slug AS creator_slug
     FROM videos v JOIN creators c ON v.creator_id = c.id
     WHERE v.id = ?`,
    [id],
  );

  if (rows.length === 0) return null;
  return { data: formatVideo(rows[0]), source: "database" };
}

export async function getVideosByCreator(creatorId, { limit = 10, offset = 0 } = {}) {
  if (!isDatabaseConfigured()) {
    const items = catalog.videos.filter((v) => v.creatorId === creatorId);
    return { data: items, source: "seed" };
  }

  const [rows] = await db.execute(
    `SELECT v.*, c.name AS creator_name FROM videos v JOIN creators c ON v.creator_id = c.id
     WHERE v.creator_id = ? ORDER BY v.published_at DESC LIMIT ? OFFSET ?`,
    [creatorId, Number(limit), Number(offset)],
  );

  return { data: rows.map(formatVideo), source: "database" };
}

export async function searchVideos(query, { limit = 20 } = {}) {
  if (!isDatabaseConfigured()) {
    const term = query.toLowerCase();
    const items = catalog.videos.filter(
      (v) => v.title.toLowerCase().includes(term) || v.creator.toLowerCase().includes(term),
    );
    return { data: items, source: "seed" };
  }

  const [rows] = await db.execute(
    `SELECT v.*, c.name AS creator_name FROM videos v JOIN creators c ON v.creator_id = c.id
     WHERE v.title LIKE ? OR c.name LIKE ?
     ORDER BY v.plays DESC LIMIT ?`,
    [`%${query}%`, `%${query}%`, Number(limit)],
  );

  return { data: rows.map(formatVideo), source: "database" };
}
