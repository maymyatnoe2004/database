import Link from "next/link";

export const dynamic = "force-dynamic";

const tones = ["magenta", "orange", "teal"];
const fallbackVideos = [
  { id: "late-night-loops", title: "Late-night loops", creator: "Nia Rose", plays: "2.1M", duration: "18:40", tone: "magenta", description: "A warm mix for the long way home." },
  { id: "tiny-desk-big-heart", title: "Tiny desk, big heart", creator: "Theo Reed", plays: "856K", duration: "12:18", tone: "orange", description: "Raw vocals, zero pretence." },
  { id: "electric-bloom", title: "Electric bloom", creator: "AVA / KAI", plays: "1.4M", duration: "24:02", tone: "teal", description: "New energy in full color." },
];

export default async function VibeDetailPage({ params }) {
  const { id } = await params;
  const video = fallbackVideos.find((v) => v.id === id) || fallbackVideos[0];

  return (
    <div className="vv-shell">
      <aside className="sidebar">
        <Link href="/" className="brand" aria-label="VibeVerse home">
          <span className="brand-mark">V</span>
          <span>VibeVerse</span>
        </Link>
        <nav className="nav-menu" aria-label="Main navigation">
          <Link className="nav-item" href="/"><span>⌂</span>Home</Link>
          <Link className="nav-item" href="/discover"><span>◈</span>Discover</Link>
          <Link className="nav-item" href="/library"><span>♫</span>Your library</Link>
        </nav>
      </aside>
      <main className="main-content" style={{ display: "grid", gap: 24 }}>
        <Link href="/" style={{ color: "var(--orange)", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>← Back</Link>
        <section style={{ position: "relative", isolation: "isolate", overflow: "hidden", borderRadius: 17, minHeight: 320, padding: 37, color: "#fff", background: `linear-gradient(135deg, ${video.tone === "magenta" ? "#770047,#e6005c" : video.tone === "orange" ? "#e63900,#ff6600" : "#005973,#00b386"})` }}>
          <div style={{ position: "absolute", right: 25, bottom: 18, opacity: 0.7, fontSize: 11 }}>{video.duration}</div>
          <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: 1.6, fontSize: 11, fontWeight: 700 }}>Now playing</p>
          <h1 style={{ margin: "3px 0 7px", fontSize: "clamp(32px, 5vw, 44px)", lineHeight: 0.98, letterSpacing: -2 }}>{video.title}</h1>
          <span style={{ fontSize: 14, opacity: 0.85 }}>{video.creator} &bull; {video.plays} plays</span>
          <p style={{ marginTop: 12, fontSize: 13, opacity: 0.78, maxWidth: 480 }}>{video.description}</p>
        </section>

        <section style={{ display: "grid", gap: 12 }}>
          <h2 style={{ fontSize: 18, letterSpacing: -0.3 }}>Up next</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {fallbackVideos.filter((v) => v.id !== id).map((v) => (
              <Link key={v.id} href={`/vibe/${v.id}`} style={{ display: "flex", gap: 14, alignItems: "center", padding: 12, borderRadius: 12, background: "#fbfbfd", textDecoration: "none", color: "inherit" }}>
                <div style={{ width: 80, height: 56, borderRadius: 8, background: `linear-gradient(135deg, ${v.tone === "magenta" ? "#770047,#e6005c" : v.tone === "orange" ? "#e63900,#ff6600" : "#005973,#00b386"})`, flex: "none" }} />
                <div>
                  <h3 style={{ fontSize: 14, margin: "0 0 2px" }}>{v.title}</h3>
                  <p style={{ fontSize: 11, color: "var(--muted)", margin: 0 }}>{v.creator} &bull; {v.plays} plays</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
