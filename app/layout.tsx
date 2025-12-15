import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prosperity Pass",
  description: "Celo mini-app for micro-donations",
  openGraph: {
    title: "Prosperity Pass",
    description: "Explore Celo rewards and support creators with Prosperity Pass.",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
      },
    ],
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
        {/* REQUIRED Mini App embed marker */}
        <meta property="fc:miniapp" content="true" />

        {/* Optional but recommended */}
        <meta property="fc:miniapp:version" content="1" />
        <meta property="fc:miniapp:image" content="https://prosperitypass.xyz/preview.png" />
        <meta property="fc:miniapp:button:title" content="Open Prosperity Pass" />
        <meta property="fc:miniapp:button:action" content="launch" />
      </head>
      <body>{children}</body>
    </html>
  );
}
