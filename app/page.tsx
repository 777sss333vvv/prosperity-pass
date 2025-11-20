"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { frameHost } from "@farcaster/frame-sdk";

export default function HomePage() {
  const [sdk, setSdk] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  // Init Farcaster Mini App SDK
  useEffect(() => {
    const init = async () => {
      try {
        const host = await frameHost(); // встроенный кошелек Farcaster
        setSdk(host);
        host.ready(); // обязательный вызов
      } catch (e) {
        console.error("Farcaster SDK init error:", e);
      }
    };
    init();
  }, []);

  // Получение аккаунта из встроенного кошелька
  useEffect(() => {
    if (!sdk) return;
    const getAccount = async () => {
      try {
        const accounts = await sdk.account.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0].address);
          const web3Instance = new Web3(sdk.ethereumProvider);
          setWeb3(web3Instance);
        }
      } catch (err) {
        console.error("Cannot get Farcaster account:", err);
      }
    };
    getAccount();
  }, [sdk]);

  // Send CELO через встроенный кошелек
  const sendCelo = async (amount: number) => {
    if (!web3 || !account) {
      alert("Wallet not ready yet");
      return;
    }
    try {
      const valueInWei = web3.utils.toWei(amount.toString(), "ether");
      await web3.eth.sendTransaction({
        from: account,
        to: "0x31DB887337778319761330f79E4699a3f9A5F6c3",
        value: valueInWei,
      });
      alert(`✓ Successfully donated ${amount} CELO`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: 500,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 26, marginBottom: 10 }}>
        Prosperity Pass — CELO Mini App
      </h1>

      {/* Описание */}
      <p
        style={{
          fontSize: 15,
          lineHeight: "22px",
          marginBottom: 20,
          opacity: 0.9,
        }}
      >
        This channel is dedicated to support and updates related to Prosperity
        Pass, a Celo ecosystem account supported by CeloPG to recognize and
        reward contributions to Celo ✨
        <br />
        <a
          href="https://pass.celopg.eco/welcome"
          target="_blank"
          style={{
            color: "#35D07F",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          pass.celopg.eco/welcome
        </a>
      </p>

      {!account ? (
        <p style={{ marginBottom: 20, fontSize: 14 }}>
          Connecting Farcaster wallet...
        </p>
      ) : (
        <p style={{ marginBottom: 20, fontSize: 14 }}>
          Connected wallet: <b>{account}</b>
        </p>
      )}

      {/* Кнопки Donate */}
      <div
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <button
          onClick={() => sendCelo(0.1)}
          style={{
            padding: "12px 18px",
            background: "#FFD700",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          Donate 0.1 CELO
        </button>

        <button
          onClick={() => sendCelo(1)}
          style={{
            padding: "12px 18px",
            background: "#FFA500",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          Donate 1 CELO
        </button>

        <button
          onClick={() => sendCelo(5)}
          style={{
            padding: "12px 18px",
            background: "#FF8C00",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
          }}
        >
          Donate 5 CELO
        </button>
      </div>
    </div>
  );
}
