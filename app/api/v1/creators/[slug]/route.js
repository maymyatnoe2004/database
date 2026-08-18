import { getCreatorBySlug } from "../../../../../lib/repositories/creators.js";
import { getVideosByCreator } from "../../../../../lib/repositories/videos.js";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  try {
    const { slug } = await params;
    const creatorResult = await getCreatorBySlug(slug);

    if (!creatorResult) {
      return Response.json({ error: "Creator not found" }, { status: 404 });
    }

    const videosResult = await getVideosByCreator(creatorResult.data.id);
    return Response.json({
      data: { ...creatorResult.data, videos: videosResult.data },
      source: creatorResult.source,
    });
  } catch {
    return Response.json({ error: "Failed to fetch creator" }, { status: 500 });
  }
}
