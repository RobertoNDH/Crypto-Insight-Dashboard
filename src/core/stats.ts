import type { PortfolioAsset } from '../types/crypto';

export const calculateGlobalStats = (assets: PortfolioAsset[]) => {
  const totalValue = assets.reduce((acc, asset) => acc + (asset.amountOwned * asset.currentPrice), 0);
  const totalCost = assets.reduce((acc, asset) => acc + (asset.amountOwned * asset.avgPurchasePrice), 0);
  
  const profitLoss = totalValue - totalCost;
  const percentage = totalCost === 0 ? 0 : (profitLoss / totalCost) * 100;

  return {
    totalValue,
    profitLoss,
    percentage
  };
};