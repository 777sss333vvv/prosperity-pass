import { useEffect } from "react";
import { Fdk } from "@farcaster/frame-sdk";

export default function HomePage() {
  useEffect(() => {
    const fdk = new Fdk();
    fdk.actions.ready();   // ← Сообщаем Farcaster, что приложение готово
  }, []);

  // ...остальной твой код ниже
"use client";

import React, { useEffect, useState } from "react";
import Web3 from "web3";

// Mini Apps SDK (Farcaster)
import { sdk as miniappSdk } from "@farcaster/miniapp-sdk"; // установить: npm i @farcaster/miniapp-sdk

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>("Not connected");
  const [isMiniApp, setIsMiniApp] = useState<boolean>(false);
  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);

  useEffect(() => {
    // Детектируем Mini App
    try {
      if (miniappSdk && typeof miniappSdk.isInMiniApp === "function") {
        setIsMiniApp(miniappSdk.isInMiniApp());
      }
    } catch (e) {
      // SDK может не быть доступен — нормально
      setIsMiniApp(false);
    }

    // Инициализация web3 (для MetaMask fallback)
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const w3 = new Web3((window as any).ethereum);
      setWeb3Instance(w3);

      (window as any).ethereum
        .request({ method: "eth_chainId" })
        .then((chainId: string) => {
          let name = "Unknown network";
          if (chainId === "0xa4ec") name = "Celo Mainnet";
          else if (chainId === "0xaef3") name = "Celo Alfajores";
          setNetwork(name);
        })
        .catch(() => setNetwork("Unknown"));
    }
  }, []);

  // ----- Connect: Farcaster mini-app or MetaMask -----
  const connectWallet = async () => {
    if (isMiniApp) {
      // Mini App: использовать SDK авторизации/контекст
      try {
        // Открывает диалог авторизации в Farcaster Mini App
        await miniappSdk.actions.openAuth?.();
        // Получаем context (если нужно)
        const ctx = await miniappSdk.context?.get();
        // ctx может содержать поля пользователя (fid/username/wallet)
        if (ctx?.auth && ctx.auth.address) {
          setAccount(ctx.auth.address);
          setNetwork("Farcaster Wallet");
          alert(`Connected via Farcaster: ${ctx.auth.address}`);
        } else {
          // если SDK не вернул адрес, сообщаем пользователю
          alert("Connected to Mini App — please approve in-app wallet if requested.");
        }
      } catch (err) {
        console.error("MiniApp connect error", err);
        alert("Failed to connect inside Mini App.");
      }
      return;
    }

    // Fallback MetaMask
    if (!web3Instance) return alert("MetaMask not detected. Please install MetaMask.");
    try {
      const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });
      setNetwork(chainId === "0xa4ec" ? "Celo Mainnet" : `Chain ${chainId}`);
      alert(`Wallet connected: ${accounts[0]}`);
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet");
    }
  };

  // ----- Отправка доната -----
  // Логика: если открыты в Mini App -> вызываем miniappSdk.actions.sendToken (откроет форму Farcaster Wallet),
  // иначе -> выполняем eth_sendTransaction через MetaMask
  const sendDonation = async (amount: number) => {
    const recipient = "0x31DB887337778319761330f79E4699a3f9A5F6c3";

    if (isMiniApp) {
      // Farcaster Mini App path (вызов SDK action)
      try {
        // Формат token — CAIP-19 (опционально). Для нативной CELO можно передать undefined и только amount/recipient.
        // Документация: https://miniapps.farcaster.xyz/docs/sdk/actions/send-token
        await miniappSdk.actions.sendToken?.({
          // token: "eip155:42220/slp/..."  // необязательно, можно опустить для нативного CELO
          amount: amount.toString(),
          recipient: recipient,
        } as any); // типы могут отличаться в зависимости от версии SDK
        alert(`Request sent to Farcaster Wallet to send ${amount} CELO`);
      } catch (err) {
        console.error("miniapp sendToken error", err);
        alert("Failed to open Farcaster send dialog.");
      }
      return;
    }

    // MetaMask path
    if (!web3Instance || !account) return alert("Please connect your wallet first (MetaMask).");
    try {
      // ручное преобразование в wei (точно)
      const value = BigInt(Math.round(amount * 1e6) * 10n ** 12n).toString(); 
      // Пояснение: Math.round(amount * 1e6) -> сохраняем 6 знаков точности, затем домножаем до 1e18.
      // (это защищает от fp ошибок; альтернативно можно использовать bn.js или decimal.js в проде)

      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: recipient,
            value: value,
          },
        ],
      });
      alert(`Thank you — ${amount} CELO sent.`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    }
  };

  return (
    <div style={{ background: "#000", color: "#FFD700", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: 700, maxWidth: "95%", background: "#111", padding: 24, borderRadius: 12 }}>
        <h2 style={{ textAlign: "center" }}>Prosperity Pass — Donate via Celo</h2>

        <p style={{ color: "#ffd", textAlign: "center" }}>
          This app is dedicated to support and updates related to Prosperity Pass — a Celo ecosystem account supported by CeloPG.
          <br />
          <a href="https://pass.celopg.eco/welcome" target="_blank" rel="noreferrer" style={{ color: "#FFD700" }}>Visit Prosperity Pass</a>
        </p>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <div style={{ marginBottom: 12, color: "#FFD700" }}>Network: {network}</div>

          {!account ? (
            <button onClick={connectWallet} style={btnStyle}>Connect Wallet</button>
          ) : (
            <div>
              <div style={{ marginBottom: 12, color: "#fff" }}>Connected: {account}</div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                {[0.1, 1, 5].map((a) => (
                  <button key={a} onClick={() => sendDonation(a)} style={btnStyle}>
                    Donate {a} CELO
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  backgroundColor: "#FFD700",
  color: "#000",
  padding: "10px 18px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: "700",
};
