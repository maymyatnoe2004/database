import { getVideos } from "../../../../lib/repositories/videos.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const mood = searchParams.get("mood");
    const limit = searchParams.get("limit") || 20;
    const offset = searchParams.get("offset") || 0;

    const result = await getVideos({ mood, limit, offset });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to fetch videos" }, { status: 500 });
  }
}
