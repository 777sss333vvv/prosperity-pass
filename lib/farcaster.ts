// lib/farcaster.ts
import { frameHost } from "@farcaster/frame-sdk";

export async function initFarcaster() {
  try {
    frameHost.ready();
    const ctx = await frameHost.context;
    return ctx;
  } catch (e) {
    console.error("Farcaster init error:", e);
    return null;
  }
}

export function openExternal(url: string) {
  try {
    frameHost.openUrl(url);
  } catch (e) {
    window.open(url, "_blank");
  }
}
