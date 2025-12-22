import { NextResponse } from "next/server";

export async function GET() {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <!-- Farcaster Mini App embed -->
    <meta property="fc:miniapp" content="true" />
    <meta property="fc:miniapp:version" content="1" />
    <meta property="fc:miniapp:image" content="https://prosperitypass.xyz/icons/og.png" />
    <meta property="fc:miniapp:aspect_ratio" content="1:1" />

    <meta property="fc:miniapp:button:1" content="Open Mini App" />
    <meta property="fc:miniapp:button:1:action" content="launch" />
    <meta property="fc:miniapp:button:1:url" content="https://prosperitypass.xyz" />

    <title>Prosperity Pass</title>
  </head>
  <body>
    Prosperity Pass Mini App
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
