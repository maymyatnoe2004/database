"use client";

import Link from "next/link";
import { useState } from "react";

const channels = [
  ["V", "Vibe Sessions", "red"],
  ["M", "Midnight Loop", "orange"],
  ["L", "Luna Ray", "purple"],
];

const creators = [
  ["IV", "Iris Vale", "Bedroom pop • Yangon", "pink"],
  ["JM", "Juno Miles", "Electronic • London", "orange"],
  ["N+", "Nova + Co.", "R&B collective • Seoul", "navy"],
  ["SC", "Sway Club", "Soul crew • Manila", "green"],
];

const videos = {
  home: [
    ["Late-night loops", "Nia Rose • 2.1M plays", "A warm mix for the long way home.", "18:40", "magenta"],
    ["Tiny desk, big heart", "Theo Reed • 856K plays", "Raw vocals, zero pretence.", "12:18", "orange"],
    ["Electric bloom", "AVA / KAI • 1.4M plays", "New energy in full color.", "24:02", "teal"],
  ],
  discover: [
    ["Tokyo Rooftop Ambient", "Kaito N. • 4.2k watching", "Analog synth landscapes recorded live in Shibuya.", "Live", "magenta"],
    ["Basement Tapes Vol. 4", "The Groove Lab • 120K plays", "Raw funk vinyl cuts and unreleased demos.", "32:10", "orange"],
    ["Nordic Chillouts", "Freja Lind • 94K plays", "Minimalist soundscapes from Reykjavik.", "45:00", "teal"],
  ],
  saved: [
    ["Late-night loops", "Nia Rose • Saved 2 days ago", "A warm mix for the long way home.", "18:40", "magenta"],
    ["Electric bloom", "AVA / KAI • Saved 5 days ago", "New energy in full color.", "24:02", "teal"],
    ["Sunset Chillwave", "Solaris • Saved 1 week ago", "Melodic downtempo beats for relaxing.", "45:12", "orange"],
  ],
};

function VideoCard({ video, onPlay }) {
  const [title, meta, description, duration, tone] = video;
  return <article className="video-card">
    <div className={`thumbnail ${tone}`}>
      <div className="vinyl" />
      <button className="play-overlay" onClick={() => onPlay(title)} aria-label={`Play ${title}`}>▶</button>
      <span className="duration">{duration}</span>
    </div>
    <h3>{title}</h3><p className="meta">{meta}</p><p className="description">{description}</p>
  </article>;
}

function CreatorCard({ creator, following, onToggle }) {
  const [initials, name, detail, color] = creator;
  return <article className="creator-card">
    <div className={`creator-avatar ${color}`}>{initials}</div><h3>{name}</h3><p className="meta">{detail}</p>
    <button className={`follow-button ${following ? "following" : ""}`} onClick={() => onToggle(name)}>{following ? "Following" : "Follow"}</button>
  </article>;
}

export default function VibeVerseApp({ page }) {
  const [activeMood, setActiveMood] = useState("For you");
  const [libraryTab, setLibraryTab] = useState("saved");
  const [following, setFollowing] = useState([]);
  const [notice, setNotice] = useState("");
  const toggleFollow = (name) => setFollowing((current) => current.includes(name) ? current.filter((entry) => entry !== name) : [...current, name]);
  const play = (title) => { setNotice(`Now playing: ${title}`); window.setTimeout(() => setNotice(""), 2600); };
  const placeholders = { home: "Search artists, moods, or stories", discover: "Explore genres, sounds, or underground scenes", library: "Search saved videos, playlists, or channels" };

  return <div className="vv-shell">
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="VibeVerse home"><span className="brand-mark">V</span><span>VibeVerse</span></Link>
      <nav className="nav-menu" aria-label="Main navigation">
        <Link className={`nav-item ${page === "home" ? "active" : ""}`} href="/"><span>⌂</span>Home</Link>
        <Link className={`nav-item ${page === "discover" ? "active" : ""}`} href="/discover"><span>◈</span>Discover</Link>
        <Link className={`nav-item ${page === "library" ? "active" : ""}`} href="/library"><span>♫</span>Your library</Link>
        <button className="nav-item" onClick={() => setNotice("Favorites coming soon.")}><span>♡</span>Favorites</button>
        <button className="nav-item" onClick={() => setNotice("Recently played is empty.")}><span>◷</span>Recently played</button>
      </nav>
      <section className="channels"><h2>Your channels</h2>{channels.map(([letter, name, color]) => <button key={name} className="channel" onClick={() => setNotice(`${name} selected.`)}><b className={`channel-dot ${color}`}>{letter}</b>{name}</button>)}</section>
      <div className="app-promo"><strong>Vibe anywhere.</strong><span>Download the mobile app</span><button onClick={() => setNotice("Mobile app link coming soon.")}>Get the app</button></div>
    </aside>
    <main className="main-content">
      <header className="top-header"><label className="search"><span>⌕</span><input aria-label="Search" placeholder={placeholders[page]} /></label><div className="header-actions"><button className="create-button" onClick={() => setNotice("Create studio coming soon.")}>＋ Create</button><button className="profile" aria-label="Open profile">E</button></div></header>
      {page === "home" && <Home activeMood={activeMood} setActiveMood={setActiveMood} play={play} following={following} toggleFollow={toggleFollow} />}
      {page === "discover" && <Discover play={play} following={following} toggleFollow={toggleFollow} />}
      {page === "library" && <Library activeTab={libraryTab} setActiveTab={setLibraryTab} play={play} following={following} toggleFollow={toggleFollow} />}
      <footer><span>Made for the moments between moments.</span><div><a href="#about">About</a><a href="#help">Help</a><a href="#community">Community</a><a href="#terms">Terms</a></div></footer>
    </main>
    {notice && <div className="toast" role="status">{notice}</div>}
  </div>;
}

function Home({ activeMood, setActiveMood, play, following, toggleFollow }) {
  const moods = ["For you", "New releases", "Focus flow", "Feel-good", "Indie radar"];
  return <><section className="hero"><div className="hero-orb one" /><div className="hero-orb two" /><p>Your soundtrack,</p><h1>unfiltered.</h1><span>Fresh videos, intimate sets, and the people making noise.</span><button onClick={() => play("Mira Sol • Live at dusk")}>▶ Play now</button><small>Mira Sol • Live at dusk</small></section>
    <section><h2>Pick a mood</h2><p className="subtitle">Your next favorite is one vibe away.</p><div className="pills">{moods.map((mood) => <button key={mood} className={activeMood === mood ? "active" : ""} onClick={() => setActiveMood(mood)}>{mood}</button>)}</div></section>
    <SectionTitle title="Trending on VibeVerse" link="See all" /><div className="video-grid">{videos.home.map((video) => <VideoCard key={video[0]} video={video} onPlay={play} />)}</div>
    <SectionTitle title="Creators you’ll love" link="Explore all" /><div className="creator-grid">{creators.map((creator) => <CreatorCard key={creator[1]} creator={creator} following={following.includes(creator[1])} onToggle={toggleFollow} />)}</div>
  </>;
}

function Discover({ play, following, toggleFollow }) {
  const genres = [["Lo-Fi & Chill", "1.4k Active Sets", "purple-gradient"], ["Indie Synth", "820 Active Sets", "sunset-gradient"], ["Deep Focus", "2.1k Active Sets", "blue-gradient"], ["Acoustic Soul", "650 Active Sets", "midnight-gradient"]];
  const scenes = [["Yangon", "BedPop Underground", "14 Bands • 32 Live Videos"], ["Berlin", "Minimal Techno Vault", "28 DJs • 110 Sets"], ["London", "UK Garage Revival", "19 Artists • 45 Mixes"], ["Seoul", "Indie R&B Collective", "22 Bands • 64 Live Videos"]];
  return <><section className="page-heading"><h1>Discover</h1><p>Unearth hidden gems, rising genres, and local sounds globally.</p></section><section><h2>Explore Genres</h2><div className="genre-grid">{genres.map(([title, count, color]) => <button key={title} className={`genre-card ${color}`}><strong>{title}</strong><span>{count}</span></button>)}</div></section><SectionTitle title="Rising Curators" link="See all" /><div className="video-grid">{videos.discover.map((video) => <VideoCard key={video[0]} video={video} onPlay={play} />)}</div><SectionTitle title="Hot Underground Scenes" /><div className="scene-grid">{scenes.map(([city, title, detail]) => <article className="scene-card" key={city}><b>{city}</b><h3>{title}</h3><p>{detail}</p><button onClick={() => toggleFollow(title)}>{following.includes(title) ? "Following" : "Explore Scene"}</button></article>)}</div></>;
}

function Library({ activeTab, setActiveTab, play, following, toggleFollow }) {
  const tabs = [["saved", "Saved Videos (6)"], ["playlists", "Playlists (3)"], ["channels", "Following (4)"]];
  const playlists = [["≡", "Midnight Coding Mix", "14 Videos • Updated yesterday", "slate"], ["ϟ", "High Energy Synth", "8 Videos • Updated 3 days ago", "fire"], ["☕", "Sunday Morning Acoustic", "21 Videos • Updated last week", "forest"]];
  return <><section className="page-heading"><h1>Your Library</h1><p>Manage your saved collections, custom playlists, and subscriptions.</p></section><div className="pills tabs">{tabs.map(([id, label]) => <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}>{label}</button>)}</div>{activeTab === "saved" && <><SectionTitle title="Saved Content" /><div className="video-grid">{videos.saved.map((video) => <VideoCard key={video[0]} video={video} onPlay={play} />)}</div></>}{activeTab === "playlists" && <><SectionTitle title="Your Playlists" /><div className="playlist-grid">{playlists.map(([icon, title, detail, color]) => <article className="playlist-card" key={title}><div className={`playlist-cover ${color}`}>{icon}</div><h3>{title}</h3><p>{detail}</p></article>)}</div></>}{activeTab === "channels" && <><SectionTitle title="Channels You Follow" /><div className="creator-grid">{creators.map((creator) => <CreatorCard key={creator[1]} creator={creator} following={true} onToggle={toggleFollow} />)}</div></>}</>;
}

function SectionTitle({ title, link }) { return <div className="section-title"><h2>{title}</h2>{link && <button>{link} →</button>}</div>; }
