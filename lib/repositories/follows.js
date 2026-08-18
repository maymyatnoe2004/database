import { db, isDatabaseConfigured } from "../db.js";

export async function getFollows(userId, { targetType, limit = 100, offset = 0 } = {}) {
  if (!isDatabaseConfigured()) {
    return { data: [], source: "seed" };
  }

  let sql = "SELECT * FROM follows WHERE user_id = ?";
  const params = [userId];

  if (targetType) {
    sql += " AND target_type = ?";
    params.push(targetType);
  }

  sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  const [rows] = await db.execute(sql, params);
  return { data: rows, source: "database" };
}

export async function isFollowing(userId, targetType, targetId) {
  if (!isDatabaseConfigured()) {
    return false;
  }

  const [rows] = await db.execute(
    "SELECT 1 FROM follows WHERE user_id = ? AND target_type = ? AND target_id = ?",
    [userId, targetType, targetId],
  );

  return rows.length > 0;
}

export async function follow(userId, targetType, targetId) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute(
    "INSERT INTO follows (user_id, target_type, target_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP",
    [userId, targetType, targetId],
  );

  return { success: true, source: "database" };
}

export async function unfollow(userId, targetType, targetId) {
  if (!isDatabaseConfigured()) {
    return { success: true, source: "seed" };
  }

  await db.execute(
    "DELETE FROM follows WHERE user_id = ? AND target_type = ? AND target_id = ?",
    [userId, targetType, targetId],
  );

  return { success: true, source: "database" };
}
