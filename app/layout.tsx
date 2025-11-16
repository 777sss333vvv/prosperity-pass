export const metadata = {
  title: "Prosperity Pass",
  description: "Celo mini-app for micro-donations",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Farcaster Mini App meta */}
        <meta property="fc:app:id" content="prosperity-pass" />
        <meta property="fc:app:version" content="1.0.0" />
        <meta property="fc:frame" content="vNext" />

        {/* Preview image */}
        <meta property="og:image" content="/preview.png" />
        <meta name="twitter:image" content="/preview.png" />
      </head>

      <body>{children}</body>
    </html>
  );
}
