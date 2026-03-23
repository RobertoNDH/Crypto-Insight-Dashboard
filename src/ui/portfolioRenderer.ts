import type { PortfolioAsset } from '../types/crypto';

export const renderPortfolio = (assets: PortfolioAsset[], containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  if (assets.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Tu cartera está vacía. Selecciona una moneda del mercado para empezar.</p>
      </div>
    `;
    return;
  }

  const totalPortfolioValue = assets.reduce((acc, asset) => acc + (asset.amountOwned * asset.currentPrice), 0);

  const totalDisplay = document.getElementById('portfolio-total-value');
  if (totalDisplay) totalDisplay.textContent = formatter.format(totalPortfolioValue);

  const html = `
    <div class="portfolio-list">
      ${assets.map(asset => {
        const profitLoss = (asset.currentPrice - asset.avgPurchasePrice) * asset.amountOwned;
        const isProfit = profitLoss >= 0;

        return `
          <div class="portfolio-item">
            <div class="item-info">
              <img src="${asset.image}" alt="${asset.name}" width="24">
              <div>
                <strong>${asset.name}</strong>
                <span>${asset.amountOwned.toFixed(4)} ${asset.symbol}</span>
              </div>
            </div>
            <div class="item-stats">
              <p>Valor: ${formatter.format(asset.amountOwned * asset.currentPrice)}</p>
              <p class="${isProfit ? 'text-green' : 'text-red'}">
                ${isProfit ? '▲' : '▼'} ${formatter.format(Math.abs(profitLoss))}
              </p>
            </div>
            <div class="item-actions">
              <button class="btn-remove" data-id="${asset.id}">Vender todo</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
};