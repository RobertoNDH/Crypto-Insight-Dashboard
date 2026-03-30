import type { Coin } from '../types/crypto';

export const renderMarket = (coins: Coin[], containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (coins.length === 0) {
    container.innerHTML = '<p class="no-results">No se encontraron resultados para tu búsqueda.</p>';
    return;
  }

  const html = `
    <table class="market-table">
      <thead>
        <tr>
          <th>Moneda</th>
          <th>Precio</th>
          <th>24h %</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        ${coins.map(coin => {
          const change = coin.priceChange24h ?? 0;
          
          return `
          <tr>
            <td>
              <img src="${coin.image}" width="20" alt="${coin.name}">
              ${coin.name} <span>(${coin.symbol})</span>
            </td>
            <td>${formatter.format(coin.currentPrice)}</td>
            <td class="${change >= 0 ? 'text-green' : 'text-red'}">
              ${change.toFixed(2)}%
            </td>
            <td>
              <button class="btn-buy" data-id="${coin.id}">Añadir</button>
            </td>
          </tr>
        `}).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = html;
};