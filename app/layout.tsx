export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* === REQUIRED Farcaster Mini App meta === */}

        <meta property="fc:miniapp" content="true" />

        {/* version MUST be a number */}
        <meta property="fc:miniapp:version" content="1" />

        {/* REQUIRED image */}
        <meta
          property="fc:miniapp:image_url"
          content="https://prosperitypass.xyz/preview.png"
        />

        {/* aspect ratio */}
        <meta
          property="fc:miniapp:aspect_ratio"
          content="1:1"
        />

        {/* REQUIRED button */}
        <meta
          property="fc:miniapp:button:1"
          content="Open Mini App"
        />
        <meta
          property="fc:miniapp:button:1:action"
          content="launch"
        />

        {/* Fallback OG */}
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/preview.png"
        />

        <title>Prosperity Pass</title>
      </head>

      <body>{children}</body>
    </html>
  );
}
