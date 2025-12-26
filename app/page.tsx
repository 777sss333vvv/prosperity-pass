// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import { initFarcaster, openExternal } from "@/lib/farcaster";

export default function Page() {
  const [address, setAddress] = useState<string | null>(null);
  const [fid, setFid] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function run() {
      const ctx: any = await initFarcaster(); // 👈 фикс типизации

      if (ctx?.account) {
        setAddress(ctx.account.address || null);
        setFid(ctx.account.fid || null);
      }

      setReady(true);
    }
    run();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <Header />

      {!ready && <div>Loading Farcaster context...</div>}

      {ready && (
        <>
          <div style={{ marginTop: 12 }}>
            <div>
              <b>FID:</b> {fid ?? "not in mini app"}
            </div>
            <div style={{ wordBreak: "break-all" }}>
              <b>Address:</b> {address ?? "not available"}
            </div>
          </div>

          <button
            style={{
              marginTop: 20,
              padding: "12px 16px",
              borderRadius: 8,
              border: "none",
              background: "#35D07F",
              color: "#000",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => openExternal("https://prosperitypass.xyz")}
          >
            Open Prosperity Pass
          </button>
        </>
      )}
    </div>
  );
}
