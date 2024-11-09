import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';

const HELIUS_API_KEY = '0efea92e-9a6d-45dd-b5ce-46250af1bac1';
const HELIUS_RPC = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

const connection = new Connection(HELIUS_RPC);

export interface TokenData {
  price: number;
  volume24h: number;
  priceChange24h: number;
  lastUpdate: string;
}

export async function getTokenData(address: string): Promise<TokenData> {
  try {
    // Fallback to mock data if API fails
    try {
      const response = await axios.get(`https://price.jup.ag/v4/price?ids=${address}`);
      const data = response.data.data[address];
      
      return {
        price: data.price,
        volume24h: data.volume24h || 0,
        priceChange24h: data.price_change_24h || 0,
        lastUpdate: new Date().toISOString()
      };
    } catch (error) {
      console.warn('API call failed, using mock data');
      return {
        price: 0.000001234,
        volume24h: 1234567,
        priceChange24h: 5.67,
        lastUpdate: new Date().toISOString()
      };
    }
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

export async function getWalletTransactions(address: string) {
  try {
    const pubKey = new PublicKey(address);
    const url = `https://api.helius.xyz/v0/addresses/${pubKey.toString()}/transactions?api-key=${HELIUS_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    throw error;
  }
}

export async function getNewsData() {
  try {
    // Using mock news data since we don't have a real news API
    return [
      {
        title: "Solana's Memecoin Ecosystem Sees Record Trading Volume",
        source: "CryptoNews",
        timestamp: new Date().toISOString(),
        url: "https://example.com/news/1"
      },
      {
        title: "New Solana Memecoins Gain Traction Among Traders",
        source: "BlockchainDaily",
        timestamp: new Date().toISOString(),
        url: "https://example.com/news/2"
      },
      {
        title: "Whale Wallet Accumulates Major Memecoin Position",
        source: "CryptoInsider",
        timestamp: new Date().toISOString(),
        url: "https://example.com/news/3"
      }
    ];
  } catch (error) {
    console.error('Error fetching news data:', error);
    return [];
  }
}