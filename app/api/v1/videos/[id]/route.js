import { getVideoById } from "../../../../../lib/repositories/videos.js";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const result = await getVideoById(id);

    if (!result) {
      return Response.json({ error: "Video not found" }, { status: 404 });
    }

    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}
