import { db, isDatabaseConfigured } from "../db.js";

function formatPlaylist(row) {
  return {
    id: row.id,
    name: row.name,
    userId: row.user_id,
    icon: row.icon || "≡",
    coverStyle: row.cover_style || "slate",
    videoCount: row.video_count || 0,
    createdAt: row.created_at,
  };
}

export async function getPlaylists(userId, { limit = 50, offset = 0 } = {}) {
  if (!isDatabaseConfigured()) {
    return { data: [], source: "seed" };
  }

  const [rows] = await db.execute(
    `SELECT p.*, COUNT(pv.video_id) AS video_count
     FROM playlists p LEFT JOIN playlist_videos pv ON pv.playlist_id = p.id
     WHERE p.user_id = ?
     GROUP BY p.id
     ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,
    [userId, Number(limit), Number(offset)],
  );

  return { data: rows.map(formatPlaylist), source: "database" };
}

export async function getPlaylistById(id) {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const [rows] = await db.execute(
    `SELECT p.*, COUNT(pv.video_id) AS video_count
     FROM playlists p LEFT JOIN playlist_videos pv ON pv.playlist_id = p.id
     WHERE p.id = ?
     GROUP BY p.id`,
    [id],
  );

  if (rows.length === 0) return null;
  return { data: formatPlaylist(rows[0]), source: "database" };
}

export async function createPlaylist(userId, { name, icon, coverStyle }) {
  if (!isDatabaseConfigured()) {
    return { data: { id: "local-" + Date.now(), name, icon: icon || "≡", coverStyle: coverStyle || "slate" }, source: "seed" };
  }

  const id = crypto.randomUUID();
  await db.execute(
    "INSERT INTO playlists (id, name, user_id, icon, cover_style) VALUES (?, ?, ?, ?, ?)",
    [id, name, userId, icon || "≡", coverStyle || "slate"],
  );

  return { data: { id, name, icon: icon || "≡", coverStyle: coverStyle || "slate" }, source: "database" };
}

export async function addVideoToPlaylist(playlistId, videoId, position = 0) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute(
    "INSERT INTO playlist_videos (playlist_id, video_id, position) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE position = ?",
    [playlistId, videoId, position, position],
  );

  return { success: true, source: "database" };
}

export async function removeVideoFromPlaylist(playlistId, videoId) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute("DELETE FROM playlist_videos WHERE playlist_id = ? AND video_id = ?", [playlistId, videoId]);
  return { success: true, source: "database" };
}

export async function deletePlaylist(id) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute("DELETE FROM playlists WHERE id = ?", [id]);
  return { success: true, source: "database" };
}
