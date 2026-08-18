import { getSavedVideos, saveVideo, unsaveVideo } from "../../../../lib/repositories/library.js";

export const dynamic = "force-dynamic";

const DEMO_USER = "demo-user";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;

    const result = await getSavedVideos(DEMO_USER, { limit, offset });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to fetch library" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { videoId, action } = body;

    if (!videoId || !action) {
      return Response.json({ error: "videoId and action are required" }, { status: 400 });
    }

    if (action === "save") {
      const result = await saveVideo(DEMO_USER, videoId);
      return Response.json(result);
    }
    if (action === "unsave") {
      const result = await unsaveVideo(DEMO_USER, videoId);
      return Response.json(result);
    }

    return Response.json({ error: "Invalid action. Use 'save' or 'unsave'." }, { status: 400 });
  } catch {
    return Response.json({ error: "Failed to update library" }, { status: 500 });
  }
}
