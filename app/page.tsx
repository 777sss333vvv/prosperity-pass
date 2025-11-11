'use client';

import React, { useState } from 'react';
import Web3 from 'web3';

export default function HomePage() {
  const [account, setAccount] = useState<string | null>(null);
  const web3 = (window as any).ethereum ? new Web3((window as any).ethereum) : null;

  const connectWallet = async () => {
    if (!web3) return alert('Metamask not detected');
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      alert(`Wallet connected: ${accounts[0]}`);
    } catch (err) {
      console.error(err);
      alert('Failed to connect wallet');
    }
  };

  const donate = async (amount: number) => {
    if (!web3 || !account) return alert('Please connect your wallet first');
    const proceed = confirm(`Are you sure you want to donate ${amount} CELO?`);
    if (!proceed) return;

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: '0x31DB887337778319761330f79E4699a3f9A5F6c3', 
        value: web3.utils.toWei(amount.toString(), 'ether'),
      });
      alert(`Thank you for donating ${amount} CELO!`);
    } catch (err) {
      console.error(err);
      alert('Transaction failed');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>
        This app is dedicated to support and updates related to Prosperity Pass, a Celo ecosystem account supported by CeloPG to recognize and reward contributions to Celo ✨
        <br />
        <a href="https://pass.celopg.eco/welcome" target="_blank" style={linkStyle}>
          Visit Prosperity Pass
        </a>
      </h1>

      {!account && (
        <div style={walletContainerStyle}>
          <button onClick={connectWallet} style={buttonStyle}>
            Connect Wallet
          </button>
        </div>
      )}

      {account && (
        <div style={donateContainerStyle}>
          <button onClick={() => donate(0.1)} style={buttonStyle}>Donate 0.1 CELO</button>
          <button onClick={() => donate(1)} style={buttonStyle}>Donate 1 CELO</button>
          <button onClick={() => donate(5)} style={buttonStyle}>Donate 5 CELO</button>
        </div>
      )}
    </div>
  );
}

// Стили
const containerStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  color: '#FFD700',
  minHeight: '100vh',
  padding: '2rem',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '800px',
  marginBottom: '3rem',
  lineHeight: '1.5',
};

const linkStyle: React.CSSProperties = {
  color: '#FFD700',
  textDecoration: 'underline',
};

const walletContainerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '2rem',
};

const donateContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
};

const buttonStyle: React.CSSProperties = {
  padding: '1rem 2rem',
  backgroundColor: '#FFD700',
  color: '#1a1a1a',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
  fontSize: '1rem',
};

// Hover эффект через inline стили с помощью onMouseOver / onMouseOut
// Можно сделать через CSS, но для простоты оставим inline
(buttonStyle as any).onMouseOver = function(this: HTMLButtonElement) {
  this.style.backgroundColor = '#e6c200';
};
(buttonStyle as any).onMouseOut = function(this: HTMLButtonElement) {
  this.style.backgroundColor = '#FFD700';
};
