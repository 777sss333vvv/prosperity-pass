import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prosperity Pass",
  description: "Celo mini-app for micro-donations",
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

        {/* REQUIRED */}
        <meta property="fc:miniapp" content="true" />
        <meta property="fc:miniapp:version" content="1" />

        {/* Preview image */}
        <meta
          property="fc:miniapp:image"
          content="https://prosperitypass.xyz/preview.png"
        />
        <meta property="fc:miniapp:aspect_ratio" content="1:1" />

        {/* Button */}
        <meta property="fc:miniapp:button:1" content="Open Mini App" />
        <meta
          property="fc:miniapp:button:1:action"
          content="launch"
        />

        {/* Fallback OG */}
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/preview.png"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
