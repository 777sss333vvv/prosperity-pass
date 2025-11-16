"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Fdk } from "@farcaster/frame-sdk";

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);

  // Инициализация Farcaster Mini App SDK
  useEffect(() => {
    const fdk = new Fdk();
    fdk.actions.ready(); // ← Очень важно
  }, []);

  // Подключение MetaMask
  async function connectWallet() {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (err) {
        alert("Failed to connect wallet.");
      }
    } else {
      alert("MetaMask not detected.");
    }
  }

  // DONATE функция
  async function donate(amountCelo: number) {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const web3 = new Web3((window as any).ethereum);

      const amountWei = web3.utils.toWei(amountCelo.toString(), "ether");

      await web3.eth.sendTransaction({
        from: account,
        to: "0x31DB887337778319761330f79E4699a3f9A5F6c3",
        value: amountWei,
      });

      alert(`Thank you! You donated ${amountCelo} CELO`);
    } catch (err) {
      alert("Transaction failed.");
    }
  }

  return (
    <div
      style={{
        background: "#f5f5dc",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#000", fontSize: "22px", marginBottom: "20px" }}>
        This app is dedicated to support and updates related to Prosperity Pass,
        a Celo ecosystem account supported by CeloPG to recognize and reward
        contributions to Celo ✨
      </h1>

      {!account ? (
        <button
          onClick={connectWallet}
          style={{
            background: "#ffcc00",
            padding: "12px 24px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <p style={{ fontSize: "16px" }}>Connected: {account}</p>
      )}

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => donate(0.1)}
          style={{
            background: "#000",
            color: "#fff",
            padding: "12px 24px",
            margin: "8px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Donate 0.1 CELO
        </button>

        <button
          onClick={() => donate(1)}
          style={{
            background: "#000",
            color: "#fff",
            padding: "12px 24px",
            margin: "8px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Donate 1 CELO
        </button>

        <button
          onClick={() => donate(5)}
          style={{
            background: "#000",
            color: "#fff",
            padding: "12px 24px",
            margin: "8px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Donate 5 CELO
        </button>
      </div>
    </div>
  );
}
