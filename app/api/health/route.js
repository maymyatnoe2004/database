import { isDatabaseConfigured, verifyDatabaseConnection } from "../../../lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await verifyDatabaseConnection();
    return Response.json({ status: "ok", database, timestamp: new Date().toISOString() });
  } catch {
    return Response.json(
      { status: "degraded", database: { configured: isDatabaseConfigured(), connected: false } },
      { status: 503 },
    );
  }
}
