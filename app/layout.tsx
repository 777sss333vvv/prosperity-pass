export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Mini App */}
        <meta property="fc:miniapp" content="vNext" />

        {/* Open Graph for preview */}
        <meta property="og:title" content="Prosperity Pass Assistant" />
        <meta
          property="og:description"
          content="Explore Prosperity Pass, earn Celo rewards, and support creators."
        />
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />

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
