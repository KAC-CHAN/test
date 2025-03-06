import React, { useState } from 'react';
import './App.css';

function App() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [scraping, setScraping] = useState(false);
  const [log, setLog] = useState([]);

  const startScraping = () => {
    if (scraping) return;
    setScraping(true);
    setLog((prev) => [...prev, 'Scraping started...']);

    const scrapeInterval = setInterval(() => {
      const randomBitcoin = Math.random() < 0.3 ? [0.003, 0.0045, 0.067][Math.floor(Math.random() * 3)] : 0;
      if (randomBitcoin > 0) {
        setWalletBalance((prev) => prev + randomBitcoin);
        setLog((prev) => [...prev, `Found ${randomBitcoin} BTC!`]);
      } else {
        setLog((prev) => [...prev, 'No Bitcoin found this time.']);
      }
    }, 3000);

    setTimeout(() => {
      clearInterval(scrapeInterval);
      setScraping(false);
      setLog((prev) => [...prev, 'Scraping stopped.']);
    }, 15000); // Stop scraping after 15 seconds for demo purposes
  };

  return (
    <div className="app">
      <div className="ios-theme">
        <h1>Bitcoin Scraper</h1>
        <p>Wallet Balance: {walletBalance.toFixed(4)} BTC</p>
        <button onClick={startScraping} disabled={scraping}>
          {scraping ? 'Scraping...' : 'Start Scraping'}
        </button>
        <div className="log">
          <h3>Log:</h3>
          {log.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
