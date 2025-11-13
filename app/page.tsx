'use client'; // Включаем client-side rendering для этого компонента

import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const [web3, setWeb3] = useState<Web3 | null>(null);

  // Подключение к Wallet только на клиенте
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      const web3Instance = new Web3((window as any).ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (web3 && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        alert(`Wallet connected: ${accounts[0]}`);
      } catch (error) {
        console.error(error);
        alert('Failed to connect wallet');
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet');
    }
  };

  const donate = async (amountCelo: number) => {
    if (!web3 || !account) {
      alert('Please connect your wallet first');
      return;
    }
    try {
      await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: account,
            to: '0x31DB887337778319761330f79E4699a3f9A5F6c3',
            value: web3.utils.toHex(web3.utils.toWei(amountCelo.toString(), 'ether')),
          },
        ],
      });
      alert(`Thank you for donating ${amountCelo} CELO!`);
    } catch (err) {
      console.error(err);
      alert('Transaction failed');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center', backgroundColor: '#fffacd', color: '#333' }}>
      <h1>This app is dedicated to support and updates related to Prosperity Pass, a Celo ecosystem account supported by CeloPG to recognize and reward contributions to Celo ✨</h1>
      {!account ? (
        <button
          onClick={connectWallet}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#ffcc00',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6b800')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffcc00')}
        >
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected Wallet: {account}</p>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {[0.1, 1, 5].map((amount) => (
              <button
                key={amount}
                onClick={() => donate(amount)}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  backgroundColor: '#ffcc00',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6b800')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffcc00')}
              >
                Donate {amount} CELO
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
