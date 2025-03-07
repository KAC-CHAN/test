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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Head>
        <title>Bitcoin Scraper Pro</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </Head>

      <main className="w-full max-w-md mx-auto">
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:shadow-3xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ₿ Bitcoin Scraper Pro
            </h1>
            <button className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-rotate" />
            <div className="relative">
              <p className="text-sm text-gray-400 mb-2">Current Balance</p>
              <p className="text-4xl font-bold text-white mb-2">
                {wallet.toFixed(4)}
                <span className="text-2xl text-blue-400 ml-2">BTC</span>
              </p>
              <p className="text-sm text-gray-400">≈ ${(wallet * 45000).toLocaleString()}</p>
            </div>
          </div>

          <button
            onClick={simulateScraping}
            disabled={isScraping}
            className={`w-full py-5 rounded-xl font-semibold transition-all duration-300 ${
              isScraping 
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-[1.02]'
            } text-white relative overflow-hidden`}
          >
            {isScraping ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/20 rounded-full border-t-white animate-spin" />
                <span>Scanning Blockchain...</span>
              </div>
            ) : (
              <>
                <span className="relative z-10">Start Mining</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-500/30 animate-pulse-slow" />
              </>
            )}
          </button>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Transaction History
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {history.map((item, index) => (
                <div 
                  key={index}
                  className="bg-gray-700/50 p-4 rounded-lg flex justify-between items-center backdrop-blur-sm transform transition-all duration-300 hover:bg-gray-700/70 hover:translate-x-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-gray-300 text-sm">{item.timestamp}</span>
                  </div>
                  <span className="text-green-400 font-medium">+{item.amount.toFixed(4)} BTC</span>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center text-gray-500 py-4 italic">
                  No transactions found
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }

        .animate-gradient-rotate {
          animation: gradient-rotate 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
