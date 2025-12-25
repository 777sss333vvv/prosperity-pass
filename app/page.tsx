"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { miniAppHost } from "@farcaster/miniapp-sdk";

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isMiniApp, setIsMiniApp] = useState(false);

  // -----------------------------
  // Init Farcaster Mini App
  // -----------------------------
  useEffect(() => {
    try {
      miniAppHost.ready();
      setIsMiniApp(true);
      console.log("✓ Farcaster mini app ready");
    } catch (e) {
      console.log("Not in Farcaster mini app context");
      setIsMiniApp(false);
    }
  }, []);

  // -----------------------------
  // Connect Wallet
  // Farcaster provider → fallback MetaMask
  // -----------------------------
  const connectWallet = async () => {
    // Try Farcaster provider first
    if (isMiniApp && miniAppHost.ethereumProvider) {
      try {
        const accs = (await miniAppHost.ethereumProvider.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (accs && accs.length > 0) {
          setAccount(accs[0]);
          setWeb3(new Web3(miniAppHost.ethereumProvider as any));
          console.log("✓ Connected Farcaster wallet:", accs[0]);
          return;
        }
      } catch (e) {
        console.error("Farcaster provider error:", e);
      }
    }

    // Fallback → injected wallet (MetaMask)
    const eth = (window as any).ethereum;
    if (!eth) {
      alert("No wallet found");
      return;
    }

    try {
      const accs = await eth.request({ method: "eth_requestAccounts" });
      setAccount(accs[0]);
      setWeb3(new Web3(eth));
      console.log("✓ Connected injected wallet:", accs[0]);
    } catch (e) {
      alert("Wallet connection failed");
    }
  };

  // -----------------------------
  // Send CELO
  // -----------------------------
  const sendCelo = async (amount: number) => {
    if (!web3 || !account) return alert("Connect wallet first");

    try {
      const value = web3.utils.toWei(amount.toString(), "ether");

      await web3.eth.sendTransaction({
        from: account,
        to: "0x31DB887337778319761330f79E4699a3f9A5F6c3", // ← твой адрес
        value,
      });

      alert(`✓ Sent ${amount} CELO`);
    } catch (e) {
      console.error(e);
      alert("Transaction failed");
    }
  };

  // -----------------------------
  // Open link (Warpcast-safe)
  // -----------------------------
  const openLink = (url: string) => {
    if (isMiniApp && miniAppHost.actions?.openUrl) {
      miniAppHost.actions.openUrl(url);
    } else {
      window.open(url, "_blank");
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Arial, sans-serif",
        maxWidth: 500,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 26, marginBottom: 12 }}>
        Prosperity Pass Mini App
      </h1>

      <p style={{ fontSize: 15, opacity: 0.9, marginBottom: 25 }}>
        Support and explore the CELO ecosystem ✨
      </p>

      <button
        onClick={() => openLink("https://warpcast.com/userbox")}
        style={{
          width: "100%",
          padding: "14px 0",
          background: "#4A90E2",
          color: "white",
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        Follow @userbox
      </button>

      <button
        onClick={() =>
          openLink(
            "https://warpcast.com/~/compose?text=Check+out+the+Prosperity+Pass+Mini+App!+https://prosperitypass.xyz"
          )
        }
        style={{
          width: "100%",
          padding: "14px 0",
          background: "#A259FF",
          color: "white",
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          marginBottom: 20,
          fontSize: 16,
        }}
      >
        Recast Mini App
      </button>

      <button
        onClick={() => openLink("https://pass.celopg.eco/welcome")}
        style={{
          width: "100%",
          padding: "14px 0",
          background: "#35D07F",
          color: "white",
          border: "none",
          borderRadius: 14,
          cursor: "pointer",
          marginBottom: 25,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Open CELO Rewards →
      </button>

      {!account ? (
        <button
          onClick={connectWallet}
          style={{
            padding: "14px 22px",
            background: "#35D07F",
            color: "white",
            borderRadius: 14,
            border: "none",
            cursor: "pointer",
            marginBottom: 20,
            fontSize: 16,
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <p style={{ marginBottom: 20, wordBreak: "break-all" }}>
          Connected: <b>{account}</b>
          <br />
          {isMiniApp ? "via Farcaster wallet" : "via injected wallet"}
        </p>
      )}

      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => sendCelo(0.1)}
          style={{
            padding: "12px 18px",
            background: "#FFD700",
            borderRadius: 10,
            border: "none",
          }}
        >
          0.1 CELO
        </button>

        <button
          onClick={() => sendCelo(1)}
          style={{
            padding: "12px 18px",
            background: "#FFA500",
            borderRadius: 10,
            border: "none",
          }}
        >
          1 CELO
        </button>

        <button
          onClick={() => sendCelo(5)}
          style={{
            padding: "12px 18px",
            background: "#FF8C00",
            borderRadius: 10,
            border: "none",
          }}
        >
          5 CELO
        </button>
      </div>
    </div>
  );
}
