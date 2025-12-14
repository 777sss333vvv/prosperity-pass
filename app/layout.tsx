import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prosperity Pass",
  description: "Explore Celo rewards and support creators with Prosperity Pass.",
  openGraph: {
    title: "Prosperity Pass",
    description:
      "Explore Celo rewards and support creators with Prosperity Pass.",
    url: "https://prosperitypass.xyz",
    siteName: "Prosperity Pass",
    images: [
      {
        url: "https://prosperitypass.xyz/icons/og.png",
        width: 1200,
        height: 630,
        alt: "Prosperity Pass Mini App",
      },
    ],
    type: "website",
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
        {/* === Farcaster Mini App === */}
        <meta
          property="fc:miniapp"
          content="https://prosperitypass.xyz/.well-known/farcaster.json"
        />

        {/* === OpenGraph (required for Embed Valid) === */}
        <meta property="og:title" content="Prosperity Pass" />
        <meta
          property="og:description"
          content="Explore Celo rewards and support creators with Prosperity Pass."
        />
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />
        <meta property="og:type" content="website" />

        {/* Optional but safe */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
