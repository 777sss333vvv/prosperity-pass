// app/layout.tsx
import type { ReactNode } from "react";

export const metadata = {
  title: "Prosperity Pass Mini App",
  description: "Celo Prosperity Pass on Farcaster",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:miniapp" content="vNext" />
      </head>
      <body style={{ margin: 0, fontFamily: "sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
