import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Prosperity Pass",
  description: "Explore Celo rewards and support creators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ================= FARCASTER MINI APP ================= */}

        {/* REQUIRED: tells Farcaster this is a Mini App */}
        <meta property="fc:miniapp" content="v1" />

        {/* App identity (must match manifest) */}
        <meta
          property="fc:miniapp:name"
          content="Prosperity Pass Assistant"
        />
        <meta
          property="fc:miniapp:icon"
          content="https://prosperitypass.xyz/icons/app-icon.png"
        />
        <meta
          property="fc:miniapp:url"
          content="https://prosperitypass.xyz"
        />

        {/* ================= SOCIAL PREVIEW ================= */}

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

        {/* Optional but recommended */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />

        {/* ===================================================== */}
      </head>

      <body>{children}</body>
    </html>
  );
}
