import { getPlaylists, createPlaylist, deletePlaylist } from "../../../../lib/repositories/playlists.js";

export const dynamic = "force-dynamic";

const DEMO_USER = "demo-user";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;

    const result = await getPlaylists(DEMO_USER, { limit, offset });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to fetch playlists" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, icon, coverStyle } = body;

    if (!name) {
      return Response.json({ error: "name is required" }, { status: 400 });
    }

    const result = await createPlaylist(DEMO_USER, { name, icon, coverStyle });
    return Response.json(result, { status: 201 });
  } catch {
    return Response.json({ error: "Failed to create playlist" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "id query parameter is required" }, { status: 400 });
    }

    const result = await deletePlaylist(id);
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to delete playlist" }, { status: 500 });
  }
}
