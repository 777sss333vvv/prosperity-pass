"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { miniApp } from "@farcaster/miniapp-sdk";

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [isMiniApp, setIsMiniApp] = useState(false);

  // -----------------------------
  // Init Farcaster Mini App SDK
  // -----------------------------
  useEffect(() => {
    try {
      miniApp.ready();
      setIsMiniApp(true);
      console.log("MiniApp SDK ready");
    } catch (e) {
      console.log("Not in Farcaster Mini App context");
    }
  }, []);

  // -----------------------------
  // Connect Wallet
  // Farcaster wallet → identity
  // MetaMask → tx signing fallback
  // -----------------------------
  const connectWallet = async () => {
    // Try Farcaster Mini App wallet
    if (isMiniApp) {
      try {
        const user = await miniApp.getUser();
        if (user?.walletAddress) {
          setAccount(user.walletAddress);
          alert("Connected Farcaster wallet:\n" + user.walletAddress);
          return;
        }
      } catch (e) {
        console.error("MiniApp wallet error:", e);
      }
    }

    // Fallback → MetaMask / injected wallet
    if (!(window as any).ethereum) {
      alert("No wallet found. Install MetaMask or use Valora.");
      return;
    }

    try {
      const acc = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);
      setWeb3(new Web3((window as any).ethereum));
    } catch {
      alert("Wallet connection failed");
    }
  };

  // -----------------------------
  // Send CELO (via MetaMask only)
  // -----------------------------
  const sendCelo = async (amount: number) => {
    if (!web3 || !account) {
      alert("Connect MetaMask wallet for transactions");
      return;
    }

    try {
      const valueInWei = web3.utils.toWei(amount.toString(), "ether");

      await web3.eth.sendTransaction({
        from: account,
        to: "0x31DB887337778319761330f79E4699a3f9A5F6c3", // <-- твой CELO адрес
        value: valueInWei,
      });

      alert(`✓ Donated ${amount} CELO`);
    } catch (e) {
      console.error(e);
      alert("Transaction failed");
    }
  };

  // -----------------------------
  // Open link (MiniApp safe)
  // -----------------------------
  const openLink = (url: string) => {
    try {
      miniApp.actions.openUrl(url);
    } catch {
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
      <h1 style={{ fontSize: 26, marginBottom: 12 }}>Prosperity Pass</h1>

      <p style={{ fontSize: 15, opacity: 0.9, marginBottom: 25 }}>
        This Mini App is dedicated to supporting and tracking activity
        within the CELO ecosystem ✨
      </p>

      {/* Follow */}
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

      {/* Recast */}
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

      {/* External site */}
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
        Open CELO Rewards Site →
      </button>

      {/* Wallet */}
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
        <p style={{ marginBottom: 20 }}>
          Connected: <b>{account}</b>
        </p>
      )}

      {/* Donations */}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {[0.1, 1, 5].map((amt) => (
          <button
            key={amt}
            onClick={() => sendCelo(amt)}
            style={{
              padding: "12px 18px",
              background: "#FFD700",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
            }}
          >
            {amt} CELO
          </button>
        ))}
      </div>
    </div>
  );
}
