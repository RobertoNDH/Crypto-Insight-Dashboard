export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  priceChange24h: number;
}

export interface PortfolioAsset extends Coin {
  amountOwned: number;
  avgPurchasePrice: number;
  totalValueUsd: number;
}

export type AppStatus = 'idle' | 'loading' | 'success' | 'error';