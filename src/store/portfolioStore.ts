import type { PortfolioAsset, Coin } from '../types/crypto';
import { StorageManager } from './storage';

const storage = new StorageManager<PortfolioAsset[]>('prism_portfolio');

let portfolio: PortfolioAsset[] = storage.load() || [];

export const portfolioStore = {
  getAssets: () => [...portfolio], 

  addAsset: (coin: Coin, amount: number, priceAtPurchase: number) => {
    const existingIndex = portfolio.findIndex(a => a.id === coin.id);

    if (existingIndex > -1) {
      const asset = portfolio[existingIndex];
      const newAmount = asset.amountOwned + amount;
      const newAvgPrice = ((asset.amountOwned * asset.avgPurchasePrice) + (amount * priceAtPurchase)) / newAmount;
      
      portfolio[existingIndex] = {
        ...asset,
        amountOwned: newAmount,
        avgPurchasePrice: newAvgPrice,
        currentPrice: coin.currentPrice 
      };
    } else {
      const newAsset: PortfolioAsset = {
        ...coin,
        amountOwned: amount,
        avgPurchasePrice: priceAtPurchase,
        totalValueUsd: amount * coin.currentPrice
      };
      portfolio.push(newAsset);
    }

    storage.save(portfolio);
  },

  removeAsset: (coinId: string) => {
    portfolio = portfolio.filter(a => a.id !== coinId);
    storage.save(portfolio);
  }
};