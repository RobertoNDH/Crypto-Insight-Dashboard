import './style.css';
import { getTopCoins } from './api/coinService';
import { portfolioStore } from './store/portfolioStore';
import { renderMarket } from './ui/marketRenderer';
import { renderPortfolio } from './ui/portfolioRenderer';
import { renderPurchaseModal } from './ui/modalRenderer';

const initApp = async () => {
  const marketContainerId = 'market-container';
  const portfolioContainerId = 'portfolio-container';

  try {
    const marketEl = document.getElementById(marketContainerId);
    if (marketEl) marketEl.innerHTML = '<p class="loading">Cargando mercado...</p>';

    const coins = await getTopCoins();

    renderMarket(coins, marketContainerId);
    renderPortfolio(portfolioStore.getAssets(), portfolioContainerId);

    const marketContainer = document.getElementById(marketContainerId);

    marketContainer?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      if (target.classList.contains('btn-buy')) {
        const coinId = target.getAttribute('data-id');
        const coin = coins.find(c => c.id === coinId);

        if (coin) {
          renderPurchaseModal(coin, (amount) => {
            portfolioStore.addAsset(coin, amount, coin.currentPrice);
            
            renderPortfolio(portfolioStore.getAssets(), portfolioContainerId);
          });
        }
      }
    });

  } catch (error) {
    console.error("Error crítico en la aplicación:", error);
    const marketEl = document.getElementById(marketContainerId);
    if (marketEl) {
      marketEl.innerHTML = `
        <div class="error-card">
          <p>No pudimos conectar con CoinGecko.</p>
          <small>${error instanceof Error ? error.message : 'Error desconocido'}</small>
        </div>
      `;
    }
  }
};

initApp();