"use client";

import React, { useState, useEffect } from "react";
import Web3 from "web3";

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [network, setNetwork] = useState<string>("Not connected");

  // Инициализация Web3
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const w3 = new Web3((window as any).ethereum);
      setWeb3(w3);
      updateNetwork();
    }
  }, []);

  const updateNetwork = async () => {
    if (!(window as any).ethereum) return;

    try {
      const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });

      let networkName = "Unknown network";

      if (chainId === "0xa4ec") networkName = "Celo Mainnet";
      else if (chainId === "0xaef3") networkName = "Celo Alfajores Testnet";
      else if (chainId === "0x2a4a") networkName = "Celo Baklava Testnet";

      setNetwork(networkName);
    } catch (err) {
      console.error("Error fetching network:", err);
    }
  };

  const connectWallet = async () => {
    if (!web3) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      await updateNetwork();
      alert(`Wallet connected: ${accounts[0]}`);
    } catch (err) {
      console.error(err);
      alert("Connection failed.");
    }
  };

  const sendCelo = async (amount: number) => {
    if (!web3 || !account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const chainId = await (window as any).ethereum.request({ method: "eth_chainId" });

      if (chainId !== "0xa4ec") {
        alert("Please switch to Celo Mainnet in MetaMask.");
        return;
      }

      const valueInWei = Web3.utils.toWei(amount.toString(), "ether");

      const tx = {
        from: account,
        to: "0x31DB887337778319761330f79E4699a3f9A5F6c3",
        value: valueInWei,
        gas: "21000",
      };

      await (window as any).ethereum.request({
        method: "eth_sendTransaction",
        params: [tx],
      });

      alert(`✅ Transaction successful! Thank you for donating ${amount} CELO 🌟`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        color: "#FFD700",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Верхний блок */}
      <div style={{ marginBottom: "40px", maxWidth: "600px" }}>
        <h2>
          This app is dedicated to support and updates related to Prosperity Pass ✨
        </h2>
        <p>
          A Celo ecosystem account supported by{" "}
          <strong>CeloPG</strong> to recognize and reward contributions to Celo.
          <br />
          <a
            href="https://pass.celopg.eco/welcome"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FFD700",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            https://pass.celopg.eco/welcome
          </a>
        </p>
      </div>

      {/* Сеть */}
      <div
        style={{
          marginBottom: "20px",
          backgroundColor: "#1a1a1a",
          padding: "10px 20px",
          borderRadius: "10px",
          fontSize: "16px",
          color: "#FFD700",
          border: "1px solid #FFD700",
        }}
      >
        Network: {network}
      </div>

      {/* Кошелёк */}
      {!account ? (
        <button
          onClick={connectWallet}
          style={{
            backgroundColor: "#FFD700",
            color: "#000",
            padding: "10px 25px",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#ffcc00")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#FFD700")
          }
        >
          Connect Wallet
        </button>
      ) : (
        <p style={{ color: "#fff", fontSize: "16px" }}>
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      )}

      {/* Кнопки донатов */}
      <div style={{ marginTop: "40px", display: "flex", gap: "15px" }}>
        {[0.1, 1, 5].map((amount) => (
          <button
            key={amount}
            onClick={() => sendCelo(amount)}
            style={{
              backgroundColor: "#FFD700",
              color: "#000",
              padding: "12px 20px",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#ffcc00")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#FFD700")
            }
          >
            Donate {amount} CELO
          </button>
        ))}
      </div>
    </div>
  );
}
