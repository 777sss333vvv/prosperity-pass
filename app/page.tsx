"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { frameHost } from "@farcaster/frame-sdk";

export default function HomePage() {
  const [sdk, setSdk] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  // Инициализация Farcaster Mini App SDK
  useEffect(() => {
    const init = async () => {
      try {
        const hostInstance = frameHost; // ← встроенный кошелек Farcaster
        setSdk(hostInstance);
        hostInstance.ready(); // обязательный вызов
      } catch (e) {
        console.error(e);
      }
    };
    init();
  }, []);

  // Подключение кошелька
  const connectWallet = async () => {
    if (sdk) {
      try {
        const farcasterAccounts = await sdk.accounts.list(); // Получаем список аккаунтов Farcaster
        if (farcasterAccounts.length > 0) {
          setAccount(farcasterAccounts[0]);
          const web3Instance = new Web3(sdk.ethereumProvider); // Используем встроенный provider
          setWeb3(web3Instance);
        } else {
          alert("No Farcaster wallet found.");
        }
      } catch (err) {
        console.error(err);
        alert("Farcaster wallet connection failed.");
      }
      return;
    }

    // Если Farcaster SDK не доступен, пробуем MetaMask
    if (!(window as any).ethereum) {
      alert("MetaMask / Celo Extension not found");
      return;
    }

    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const web3Instance = new Web3((window as any).ethereum);
      setAccount(accounts[0]);
      setWeb3(web3Instance);
    } catch (err) {
      alert("Wallet connection error");
      console.error(err);
    }
  };

  // Отправка CELO
  const sendCelo = async (amount: number) => {
    if (!web3 || !account) {
      alert("Please connect your wallet first");
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

      {/* ---- Текст сверху ---- */}
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
      {/* ---------------------- */}

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
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <p style={{ marginBottom: 20, fontSize: 14 }}>
          Connected wallet: <b>{account}</b>
        </p>
      )}

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "10px" }}>
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
