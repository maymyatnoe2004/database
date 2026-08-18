import { addVideoToPlaylist, removeVideoFromPlaylist, getPlaylistById } from "../../../../../lib/repositories/playlists.js";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { videoId, position } = body;

    if (!videoId) {
      return Response.json({ error: "videoId is required" }, { status: 400 });
    }

    const playlist = await getPlaylistById(id);
    if (!playlist) {
      return Response.json({ error: "Playlist not found" }, { status: 404 });
    }

    const result = await addVideoToPlaylist(id, videoId, position);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to add video to playlist" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");

    if (!videoId) {
      return Response.json({ error: "videoId query parameter is required" }, { status: 400 });
    }

    const result = await removeVideoFromPlaylist(id, videoId);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to remove video from playlist" }, { status: 500 });
  }
}
