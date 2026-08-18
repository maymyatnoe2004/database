import { follow, unfollow, getFollows } from "../../../../lib/repositories/follows.js";

export const dynamic = "force-dynamic";

const DEMO_USER = "demo-user";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get("type");

    const result = await getFollows(DEMO_USER, { targetType });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to fetch follows" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { targetType, targetId, action } = body;

    if (!targetType || !targetId || !action) {
      return Response.json({ error: "targetType, targetId, and action are required" }, { status: 400 });
    }

    if (!["creator", "channel"].includes(targetType)) {
      return Response.json({ error: "targetType must be 'creator' or 'channel'" }, { status: 400 });
    }

    if (action === "follow") {
      const result = await follow(DEMO_USER, targetType, targetId);
      return Response.json(result);
    }
    if (action === "unfollow") {
      const result = await unfollow(DEMO_USER, targetType, targetId);
      return Response.json(result);
    }

    return Response.json({ error: "Invalid action. Use 'follow' or 'unfollow'." }, { status: 400 });
  } catch {
    return Response.json({ error: "Failed to update follow state" }, { status: 500 });
  }
}
