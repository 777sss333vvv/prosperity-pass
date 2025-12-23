export default function Head() {
  return (
    <>
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

      {/* OG для превью */}
      <meta
        property="og:image"
        content="https://prosperitypass.xyz/icons/og.png"
      />
      <title>Prosperity Pass</title>
    </>
  );
}
