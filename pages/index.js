import { useState } from 'react';
import Head from 'next/head';

const BITCOIN_VALUES = [0.003, 0.0045, 0.067, 0.0023, 0.0056, 0.0012];
const MIN_DELAY = 3000; // 3 seconds
const MAX_DELAY = 8000; // 8 seconds

export default function Home() {
  const [isScraping, setIsScraping] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [history, setHistory] = useState([]);

  const simulateScraping = async () => {
    setIsScraping(true);
    
    const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    const shouldFind = Math.random() < 0.3; // 30% chance to find
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    if (shouldFind) {
      const foundAmount = BITCOIN_VALUES[Math.floor(Math.random() * BITCOIN_VALUES.length)];
      setWallet(prev => prev + foundAmount);
      setHistory(prev => [
        { amount: foundAmount, timestamp: new Date().toLocaleTimeString() },
        ...prev
      ]);
    }
    
    setIsScraping(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Bitcoin Scraper Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-16">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
            <span className="animate-bounce-slow">₿</span> Bitcoin Scraper Pro
          </h1>

          <div className="bg-gray-100 rounded-xl p-6 mb-8">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Wallet Balance</p>
              <p className="text-3xl font-semibold text-gray-800">
                {wallet.toFixed(4)} BTC
              </p>
            </div>
          </div>

          <button
            onClick={simulateScraping}
            disabled={isScraping}
            className={`w-full py-4 rounded-xl font-semibold transition-all ${
              isScraping 
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {isScraping ? (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 animate-spin-slow" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Scraping...
              </div>
            ) : (
              'Start Scraping'
            )}
          </button>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {history.map((item, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <span className="text-gray-600">{item.timestamp}</span>
                  <span className="text-green-500 font-medium">+{item.amount.toFixed(4)} BTC</span>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  No transactions yet
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
