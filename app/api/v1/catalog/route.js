import { catalog } from "../../../../lib/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ data: catalog, source: "seed" });
}
