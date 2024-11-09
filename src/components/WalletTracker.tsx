import React, { useState } from 'react';
import { Wallet, Plus, Trash2 } from 'lucide-react';

const WalletTracker: React.FC = () => {
  const [wallets, setWallets] = useState<string[]>([]);
  const [newWallet, setNewWallet] = useState('');

  const addWallet = () => {
    if (newWallet && !wallets.includes(newWallet)) {
      setWallets([...wallets, newWallet]);
      setNewWallet('');
    }
  };

  const removeWallet = (wallet: string) => {
    setWallets(wallets.filter(w => w !== wallet));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Wallet className="h-6 w-6 text-indigo-500 mr-2" />
        <h2 className="text-xl font-bold">Whale Wallet Tracker</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newWallet}
          onChange={(e) => setNewWallet(e.target.value)}
          placeholder="Enter wallet address"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addWallet}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-2">
        {wallets.map((wallet) => (
          <div key={wallet} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700 truncate flex-1">
              {wallet}
            </span>
            <button
              onClick={() => removeWallet(wallet)}
              className="ml-2 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {wallets.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            No wallets added yet. Add a wallet to track large transactions.
          </p>
        )}
      </div>
    </div>
  );
}

export default WalletTracker;