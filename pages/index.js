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
    <div className="min-h-screen mining-background flex items-center justify-center p-4">
      <Head>
        <title>Bitcoin Mining Interface</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="w-full max-w-md z-10">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-800/50">
          <div className="flex items-center justify-center mb-8">
            <svg 
              className="w-16 h-16 bitcoin-pulse text-blue-400"
              viewBox="0 0 24 24"
            >
              <path 
                fill="currentColor" 
                d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.22 15.533.382 9.105 1.982 2.67 8.493-1.22 14.923.382c6.43 1.605 10.34 8.113 8.715 14.522zM12.814 4.157a.605.605 0 0 0-.763.425l-1.71 6.624-2.95-6.335a.61.61 0 0 0-.566-.377.606.606 0 0 0-.556.376L3.43 11.25H.606a.606.606 0 1 0 0 1.212h3.05c.284 0 .54-.172.647-.435l1.384-3.073 2.95 6.335a.606.606 0 0 0 .566.377.607.607 0 0 0 .556-.377l2.456-5.683 1.075 3.755c.108.375.52.582.888.46.368-.12.57-.52.46-.888l-1.406-4.93 3.044.001a.606.606 0 1 0 0-1.212h-3.643a.606.606 0 0 0-.57.4l-1.86 4.308-1.534-5.35 1.69-6.555a.605.605 0 0 0-.425-.763z"
              />
            </svg>
          </div>

          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 mb-8 border border-blue-400/20 relative">
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
            className="mining-button w-full py-5 rounded-xl font-bold text-white text-lg relative"
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
              <svg 
                className="w-5 h-5 mr-2 text-purple-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Mining History
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {history.map((item, index) => (
                <div 
                  key={index}
                  className="transaction-item bg-gray-800/50 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm border border-gray-700/30"
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

        {/* Circuit background animation */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path 
            className="circuit-path"
            d="M0,50 L20,50 Q30,50 30,60 L30,80 Q30,90 40,90 L60,90 Q70,90 70,80 L70,20 Q70,10 80,10 L90,10"
            fill="none" 
            stroke="#3B82F6" 
            strokeWidth="0.5"
          />
          <path 
            className="circuit-path"
            d="M100,20 L80,20 Q70,20 70,30 L70,50 Q70,60 60,60 L40,60 Q30,60 30,50 L30,30 Q30,20 20,20 L0,20"
            fill="none" 
            stroke="#8B5CF6" 
            strokeWidth="0.5"
          />
        </svg>
      </main>
    </div>
  );
}
