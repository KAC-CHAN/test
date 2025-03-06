import { useState, useEffect } from 'react';

function App() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [isScraping, setIsScraping] = useState(false);
  const [logs, setLogs] = useState([]);
  const bitcoinValues = [0.003, 0.0045, 0.0067, 0.0021, 0.0049, 0.0053];

  useEffect(() => {
    let interval;
    if (isScraping) {
      interval = setInterval(() => {
        // 25% chance to find bitcoin
        if (Math.random() < 0.25) {
          const foundBtc = bitcoinValues[Math.floor(Math.random() * bitcoinValues.length)];
          setWalletBalance(prev => prev + foundBtc);
          setLogs(prev => [`+${foundBtc} BTC found - ${new Date().toLocaleTimeString()}`, ...prev]);
        } else {
          setLogs(prev => [`Scraping... No results - ${new Date().toLocaleTimeString()}`, ...prev]);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isScraping]);

  return (
    <div className="container">
      <h1 className="header">Bitcoin Scraper</h1>
      
      <div className="wallet-card">
        <div className="wallet-header">Wallet Balance</div>
        <div className="wallet-balance">{walletBalance.toFixed(4)} BTC</div>
      </div>

      <button 
        className={`scrape-button ${isScraping ? 'active' : ''}`}
        onClick={() => setIsScraping(!isScraping)}
      >
        {isScraping ? 'Stop Scraping' : 'Start Scraping'}
      </button>

      <div className="logs-container">
        <h3>Activity Log</h3>
        <div className="logs">
          {logs.map((log, index) => (
            <div key={index} className="log-entry">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
