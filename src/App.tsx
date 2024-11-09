import React, { useEffect, useState } from 'react';
import { getTokenData, getNewsData } from './services/api';
import TokenStats from './components/TokenStats';
import WalletTracker from './components/WalletTracker';
import NewsSection from './components/NewsSection';
import { Coins } from 'lucide-react';

// Example token address (BONK)
const TOKEN_ADDRESS = 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263';

interface TokenData {
  price: number;
  volume24h: number;
  priceChange24h: number;
  lastUpdate: string;
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
}

function App() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTokenData(TOKEN_ADDRESS);
        setTokenData(data);

        // Generate some chart data for demonstration
        const now = Date.now();
        const newChartData = Array.from({ length: 24 }, (_, i) => ({
          timestamp: now - (23 - i) * 3600000,
          price: data.price * (1 + (Math.random() - 0.5) * 0.1),
        }));
        setChartData(newChartData);

        const newsData = await getNewsData();
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!tokenData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Coins className="h-8 w-8 text-indigo-500" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Solana Memecoin Dashboard</h1>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <TokenStats data={tokenData} chartData={chartData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WalletTracker />
            <NewsSection news={news} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;