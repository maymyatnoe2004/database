import { getCreators } from "../../../../lib/repositories/creators.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") || 20;
    const offset = searchParams.get("offset") || 0;

    const result = await getCreators({ limit, offset });
    return Response.json(result);
  } catch {
    return Response.json({ error: "Failed to fetch creators" }, { status: 500 });
  }
}
