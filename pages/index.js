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
        <title>Bitcoin Miner Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="w-full max-w-md z-10">
        <div className="bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/10">
          <div className="flex items-center justify-center mb-8">
            <div className="relative mining-rays">
              <div className="bitcoin-animation text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ₿
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 mb-8 border border-white/10">
            <div className="text-center">
              <p className="text-sm text-blue-300 mb-2">Total Mined</p>
              <p className="text-5xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {wallet.toFixed(4)}
                <span className="text-2xl ml-2">BTC</span>
              </p>
              <p className="text-sm text-blue-300 mt-2">
                ≈ ${(wallet * 45000).toLocaleString()}
              </p>
            </div>
          </div>

          <button
            onClick={simulateScraping}
            disabled={isScraping}
            className="w-full py-5 rounded-xl font-bold text-white text-lg relative
              bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
              transition-all duration-300 button-glow"
          >
            {isScraping ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-4 h-4 border-2 border-white rounded-full animate-spin" />
                <span>Mining in Progress...</span>
              </div>
            ) : (
              'Start Bitcoin Mining'
            )}
          </button>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-blue-300 mb-4 flex items-center">
              <span className="mr-2 text-purple-400">📜</span>
              Mining History
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {history.map((item, index) => (
                <div 
                  key={index}
                  className="transaction-pop bg-black/30 p-4 rounded-lg flex justify-between items-center
                    border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-gray-300 text-sm">{item.timestamp}</span>
                  </div>
                  <span className="text-green-400 font-medium">
                    +{item.amount.toFixed(4)} BTC
                  </span>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center text-gray-500 py-4 italic">
                  No mining results yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
