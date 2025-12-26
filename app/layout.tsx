// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prosperity Pass",
  description: "Prosperity Pass Farcaster Mini App",
  openGraph: {
    title: "Prosperity Pass",
    description: "Prosperity Pass Farcaster Mini App",
    url: "https://prosperitypass.xyz",
  },
  other: {
    "fc:miniapp": "true",
    "fc:miniapp:name": "Prosperity Pass",
    "fc:miniapp:url": "https://prosperitypass.xyz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
