import { useState } from 'react';
import Head from 'next/head';

const BITCOIN_VALUES = [0.003, 0.0045, 0.067, 0.0023, 0.0056, 0.0012];
const MIN_DELAY = 3000;
const MAX_DELAY = 8000;

export default function Home() {
  const [isScraping, setIsScraping] = useState(false);
  const [wallet, setWallet] = useState(0);
  const [history, setHistory] = useState([]);

  const simulateScraping = async () => {
    setIsScraping(true);
    
    const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
    const shouldFind = Math.random() < 0.3;
    
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
    <div className="min-h-screen mining-bg text-white flex items-center justify-center p-4">
      <Head>
        <title>Neon Bitcoin Miner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="w-full max-w-2xl text-center">
        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-50 particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="space-y-8">
          {/* Bitcoin Icon */}
          <div className="bitcoin-pulse text-8xl text-cyan-400 glow-text">
            ₿
          </div>

          {/* Wallet Balance */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-300">
              Total Mined Bitcoin
            </h2>
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text glow-text">
              {wallet.toFixed(4)} BTC
            </div>
            <p className="text-xl text-cyan-200">
              ≈ ${(wallet * 45000).toLocaleString()}
            </p>
          </div>

          {/* Mining Button */}
          <button
            onClick={simulateScraping}
            disabled={isScraping}
            className="mining-button mx-auto px-12 py-4 rounded-full text-xl font-bold text-black hover:scale-105 transition-transform"
          >
            {isScraping ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-4 border-black rounded-full animate-spin" />
                <span>Mining...</span>
              </div>
            ) : (
              '🚀 Start Mining Now'
            )}
          </button>

          {/* Transaction History */}
          <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-pink-300 mb-4">
              ⚡ Recent Transactions
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-cyan-500/20 to-pink-500/20 p-4 rounded-lg flex justify-between items-center animate-fade-in"
                >
                  <span className="text-cyan-300">{item.timestamp}</span>
                  <span className="text-pink-300 font-bold">
                    +{item.amount.toFixed(4)} BTC
                  </span>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-cyan-200 py-4">
                  No transactions yet - start mining!
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
