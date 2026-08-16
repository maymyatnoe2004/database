import "./globals.css";

export const metadata = {
  title: "VibeVerse — Your soundtrack, unfiltered.",
  description: "Discover fresh music videos, intimate sets, and rising creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
