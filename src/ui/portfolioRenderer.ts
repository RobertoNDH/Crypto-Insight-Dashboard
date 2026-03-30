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

  const totalPortfolioValue = assets.reduce((acc, asset) => {
    const price = asset.currentPrice ?? 0;
    const amount = asset.amountOwned ?? 0;
    return acc + (amount * price);
  }, 0);

  const totalDisplay = document.getElementById('portfolio-total-value');
  if (totalDisplay) totalDisplay.textContent = formatter.format(totalPortfolioValue);

  const html = `
    <div class="portfolio-list">
      ${assets.map(asset => {
        const currentPrice = asset.currentPrice ?? 0;
        const avgPrice = asset.avgPurchasePrice ?? 0;
        const amount = asset.amountOwned ?? 0;
        
        const profitLoss = (currentPrice - avgPrice) * amount;
        const isProfit = profitLoss >= 0;

        return `
          <div class="portfolio-item">
            <div class="item-info">
              <img src="${asset.image}" alt="${asset.name}" width="32">
              <div>
                <strong>${asset.name}</strong>
                <span>${amount.toFixed(4)} ${asset.symbol}</span>
              </div>
            </div>
            <div class="item-stats">
              <p>${formatter.format(amount * currentPrice)}</p>
              <p class="${isProfit ? 'text-green' : 'text-red'}">
                ${isProfit ? '▲' : '▼'} ${formatter.format(Math.abs(profitLoss))}
              </p>
            </div>
            <div class="item-actions">
              <button class="btn-remove" data-id="${asset.id}">Vender</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;
};