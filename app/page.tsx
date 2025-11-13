"use client";

import React, { useState } from "react";
import Web3 from "web3";

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);

  // Подключение кошелька
  const connectWallet = async () => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const web3 = new Web3((window as any).ethereum);
      await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();

      setAccount(accounts[0]);
      setNetwork(chainId.toString());
      alert("✅ Wallet connected successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to connect wallet.");
    }
  };

  // Отправка доната
  const sendDonation = async (amount: number) => {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      const web3 = new Web3((window as any).ethereum);
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const recipient = "0x31DB887337778319761330f79E4699a3f9A5F6c3";

      // Правильное вычисление CELO в wei
      const value = BigInt(amount * 10 ** 18).toString();

      await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: value,
      });

      alert(`🎉 Thank you! You sent ${amount} CELO`);
    } catch (error) {
      console.error(error);
      alert("❌ Transaction failed.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-300 text-gray-900 flex flex-col items-center justify-center p-6">
      <div className="bg-black/80 text-yellow-300 p-6 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">
          🌍 Prosperity Pass — Celo Mini App
        </h1>

        <p className="text-sm mb-6 text-yellow-200">
          This app is dedicated to support and updates related to Prosperity
          Pass, a Celo ecosystem account supported by CeloPG to recognize and
          reward contributions to Celo ✨
          <br />
          <a
            href="https://pass.celopg.eco/welcome"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-400 transition"
          >
            https://pass.celopg.eco/welcome
          </a>
        </p>

        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg transition"
          >
            🔗 Connect Wallet
          </button>
        ) : (
          <div>
            <p className="text-xs text-yellow-200 mb-4 break-all">
              Connected: {account}
            </p>
            <p className="text-xs mb-4">Network ID: {network}</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => sendDonation(0.1)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition"
              >
                💛 Donate 0.1 CELO
              </button>
              <button
                onClick={() => sendDonation(1)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition"
              >
                💛 Donate 1 CELO
              </button>
              <button
                onClick={() => sendDonation(5)}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-xl transition"
              >
                💛 Donate 5 CELO
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="text-xs text-gray-800 mt-8">
        Built with 💛 on Celo • Powered by Next.js
      </footer>
    </main>
  );
}
