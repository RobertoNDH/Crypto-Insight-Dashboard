import { apiFetch } from "./client";
import type { CoinGeckoMarketDTO } from "../types/api";
import type { Coin } from "../types/crypto";

const mapToCoin = (dto: CoinGeckoMarketDTO): Coin => ({
  id: dto.id,
  symbol: dto.symbol.toUpperCase(),
  name: dto.name,
  image: dto.image,
  currentPrice: dto.current_price,
  marketCap: dto.market_cap,
  priceChange24h: dto.price_change_percentage_24h,
});

export const getTopCoins = async (): Promise<Coin[]> => {
  const endpoint =
    "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";
  const data = await apiFetch<CoinGeckoMarketDTO[]>(endpoint);
  return data.map(mapToCoin);
};
