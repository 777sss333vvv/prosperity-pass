"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { frameHost } from "@farcaster/frame-sdk";

export default function HomePage() {
  const [sdk, setSdk] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  // -----------------------------
  // Initialize Farcaster Mini App SDK
  // -----------------------------
  useEffect(() => {
    try {
      setSdk(frameHost); // SDK instance (NO parentheses!)
      frameHost.ready(); // required
    } catch (e) {
      console.error("Farcaster init error:", e);
    }
  }, []);

  // -----------------------------
  // Connect Wallet (Farcaster → fallback MetaMask)
  // -----------------------------
  const connectWallet = async () => {
    if (sdk) {
      try {
        const farcasterAccounts = await sdk.accounts.list();
        if (farcasterAccounts.length > 0) {
          setAccount(farcasterAccounts[0]);
          setWeb3(new Web3(sdk.ethereumProvider));
          return;
        }
      } catch (e) {
        console.error("Farcaster wallet error:", e);
      }
    }

    // fallback → MetaMask / Celo extension
    if (!(window as any).ethereum) {
      alert("Wallet not found");
      return;
    }

    try {
      const acc = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);
      setWeb3(new Web3((window as any).ethereum));
    } catch (e) {
      alert("Wallet connection failed");
    }
  };

  // -----------------------------
  // Send CELO donation
  // -----------------------------
  const sendCelo = async (amount: number) => {
    if (!web3 || !account) return alert("Connect wallet first");

    try {
      const valueInWei = web3.utils.toWei(amount.toString(), "ether");

      await web3.eth.sendTransaction({
        from: account,
        to: "0x31DB887337778319761330f79E4699a3f9A5F6c3", // <<< EDIT your CELO address
        value: valueInWei,
      });

      alert(`✓ Donated ${amount} CELO`);
    } catch (e) {
      console.error(e);
      alert("Transaction failed");
    }
  };

  // -----------------------------
  // Open external link (Farcaster-safe)
  // -----------------------------
  const openLink = (url: string) => {
    if (sdk?.actions?.openUrl) {
      sdk.actions.openUrl(url);
    } else {
      window.open(url, "_blank");
    }
  };

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

      {/* ----------------------------- */}
      {/* Follow User Button */}
      {/* ----------------------------- */}
      <button
        onClick={() => openLink("https://warpcast.com/userbox")} // <<< already correct
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

      {/* ----------------------------- */}
      {/* Recast Mini App Button */}
      {/* ----------------------------- */}
      <button
        onClick={() =>
          openLink(
            "https://warpcast.com/~/compose?text=Check+out+the+Prosperity+Pass+Mini+App!+https://yourdomain.com"
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

      {/* ----------------------------- */}
      {/* CELO Official Site Button */}
      {/* ----------------------------- */}
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
          textDecoration: "none",
        }}
      >
        Open CELO Rewards Site →
      </button>

      {/* ----------------------------- */}
      {/* Wallet connection */}
      {/* ----------------------------- */}
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
          Connected wallet: <b>{account}</b>
        </p>
      )}

      {/* ----------------------------- */}
      {/* Donation buttons */}
      {/* ----------------------------- */}
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
