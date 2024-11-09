import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistance } from 'date-fns';
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react';

interface ChartDataPoint {
  timestamp: number;
  price: number;
}

interface TokenData {
  price: number;
  volume24h: number;
  priceChange24h: number;
  lastUpdate: string;
}

interface TokenStatsProps {
  data: TokenData;
  chartData: ChartDataPoint[];
}

const TokenStats: React.FC<TokenStatsProps> = ({ data, chartData }) => {
  const priceChangeColor = data.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500';
  const PriceIcon = data.priceChange24h >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current Price</p>
              <p className="text-2xl font-bold">${data.price.toFixed(6)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-indigo-500" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">24h Volume</p>
              <p className="text-2xl font-bold">${data.volume24h.toLocaleString()}</p>
            </div>
            <BarChart2 className="h-8 w-8 text-indigo-500" />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">24h Change</p>
              <p className={`text-2xl font-bold ${priceChangeColor}`}>
                {data.priceChange24h >= 0 ? '+' : ''}{data.priceChange24h.toFixed(2)}%
              </p>
            </div>
            <PriceIcon className={`h-8 w-8 ${priceChangeColor}`} />
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) => formatDistance(timestamp, new Date(), { addSuffix: true })}
            />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip
              labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
              formatter={(value: number) => [`$${value.toFixed(6)}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Last updated: {formatDistance(new Date(data.lastUpdate), new Date(), { addSuffix: true })}
      </p>
    </div>
  );
};

export default TokenStats;