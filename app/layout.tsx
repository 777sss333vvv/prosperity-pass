export const metadata = {
  title: "Prosperity Pass",
  description: "Celo mini app for rewards and donations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Mini App */}
        <meta property="fc:app:id" content="prosperitypass.xyz" />
        <meta property="fc:app:version" content="1.0.0" />

        {/* 🔴 ЭТО КЛЮЧ */}
        <meta
          property="fc:miniapp"
          content="https://prosperitypass.xyz/.well-known/farcaster.json"
        />

        {/* Preview */}
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />
        <meta
          name="twitter:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
