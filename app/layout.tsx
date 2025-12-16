import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prosperity Pass",
  description: "Celo mini-app for rewards and micro-donations",
  openGraph: {
    title: "Prosperity Pass",
    description: "Explore Celo rewards and support creators",
    images: ["https://prosperitypass.xyz/preview.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* === Farcaster Mini App Embed === */}
        <meta property="fc:miniapp" content="true" />

        {/* ОБЯЗАТЕЛЬНО: версия (строго число) */}
        <meta property="fc:miniapp:version" content="1" />

        {/* ОБЯЗАТЕЛЬНО: imageUrl (absolute https URL) */}
        <meta
          property="fc:miniapp:image"
          content="https://prosperitypass.xyz/preview.png"
        />

        {/* aspect ratio (можно 1:1 или 1.91:1) */}
        <meta property="fc:miniapp:aspect_ratio" content="1:1" />

        {/* ОБЯЗАТЕЛЬНО: кнопка */}
        <meta
          property="fc:miniapp:button:1"
          content="Open Mini App"
        />
        <meta
          property="fc:miniapp:button:1:action"
          content="launch"
        />

        {/* OpenGraph fallback */}
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/preview.png"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
