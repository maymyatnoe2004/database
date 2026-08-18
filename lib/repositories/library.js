import { db, isDatabaseConfigured } from "../db.js";
import { catalog } from "../catalog.js";

export async function getSavedVideos(userId, { limit = 50, offset = 0 } = {}) {
  if (!isDatabaseConfigured()) {
    return { data: catalog.videos.map((v) => ({ ...v, tone: "magenta" })), source: "seed" };
  }

  const [rows] = await db.execute(
    `SELECT v.*, c.name AS creator_name, s.saved_at
     FROM saved_items s
     JOIN videos v ON v.id = s.video_id
     JOIN creators c ON c.id = v.creator_id
     WHERE s.user_id = ?
     ORDER BY s.saved_at DESC LIMIT ? OFFSET ?`,
    [userId, Number(limit), Number(offset)],
  );

  return {
    data: rows.map((r) => ({
      id: r.id,
      title: r.title,
      creator: r.creator_name,
      plays: r.plays,
      duration: r.duration,
      mood: r.mood,
      tone: r.tone || "magenta",
      description: r.description,
      savedAt: r.saved_at,
    })),
    source: "database",
  };
}

export async function saveVideo(userId, videoId) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute(
    "INSERT INTO saved_items (user_id, video_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE saved_at = CURRENT_TIMESTAMP",
    [userId, videoId],
  );

  return { success: true, source: "database" };
}

export async function unsaveVideo(userId, videoId) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute("DELETE FROM saved_items WHERE user_id = ? AND video_id = ?", [userId, videoId]);
  return { success: true, source: "database" };
}
