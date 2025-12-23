export default function EmbedPage() {
  return (
    <>
      <head>
        <meta property="fc:miniapp:version" content="vNext" />
        <meta
          property="fc:miniapp:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />
        <meta property="fc:miniapp:aspect_ratio" content="1:1" />

        <meta
          property="fc:miniapp:button:1"
          content="Open Mini App"
        />
        <meta
          property="fc:miniapp:button:1:action"
          content="launch"
        />

        {/* обычные og для превью */}
        <meta
          property="og:image"
          content="https://prosperitypass.xyz/icons/og.png"
        />
        <title>Prosperity Pass</title>
      </head>

      <main>
        <h1>Prosperity Pass Mini App</h1>
      </main>
    </>
  );
}
