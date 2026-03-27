import './style.css';
import { getTopCoins } from './api/coinService';
import { portfolioStore } from './store/portfolioStore';
import { renderMarket } from './ui/marketRenderer';
import { renderPortfolio } from './ui/portfolioRenderer';
import { renderPurchaseModal } from './ui/modalRenderer';
import { calculateGlobalStats } from './core/stats';

const marketId = 'market-container';
const portfolioId = 'portfolio-container';

const updateGlobalHeader = () => {
  const assets = portfolioStore.getAssets();
  const stats = calculateGlobalStats(assets);
  const headerEl = document.getElementById('global-stats');
  
  if (headerEl) {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const colorClass = stats.profitLoss >= 0 ? 'text-green' : 'text-red';
    const sign = stats.profitLoss >= 0 ? '+' : '';

    headerEl.innerHTML = `
      <span>Balance: <strong>${formatter.format(stats.totalValue)}</strong></span>
      <span class="${colorClass}">${sign}${stats.percentage.toFixed(2)}%</span>
    `;
  }
};

const initApp = async () => {
  try {
    const coins = await getTopCoins();

    renderMarket(coins, marketId);
    renderPortfolio(portfolioStore.getAssets(), portfolioId);
    updateGlobalHeader();

    const marketEl = document.getElementById(marketId);
    marketEl?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('btn-buy')) {
        const coinId = target.getAttribute('data-id');
        const coin = coins.find(c => c.id === coinId);
        if (coin) {
          renderPurchaseModal(coin, (amount) => {
            portfolioStore.addAsset(coin, amount, coin.currentPrice);
            renderPortfolio(portfolioStore.getAssets(), portfolioId);
            updateGlobalHeader();
          });
        }
      }
    });

    const portfolioEl = document.getElementById(portfolioId);
    portfolioEl?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('btn-remove')) {
        const coinId = target.getAttribute('data-id');
        if (coinId && confirm('¿Vender este activo y eliminar de la cartera?')) {
          portfolioStore.removeAsset(coinId);
          renderPortfolio(portfolioStore.getAssets(), portfolioId);
          updateGlobalHeader();
        }
      }
    });

    const searchInput = document.getElementById('search-coin') as HTMLInputElement;

    searchInput?.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value.toLowerCase();

      const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(query) || 
        coin.symbol.toLowerCase().includes(query)
      );

      renderMarket(filteredCoins, marketId);
    });

    const navButtons = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view-section');

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-view');

        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        views.forEach(view => {
          if (view.id === `view-${targetView}`) {
            view.classList.remove('hidden');
          } else {
            view.classList.add('hidden');
          }
        });
      });
    });

  } catch (error) {
    console.error("Error al iniciar Prism:", error);
    const marketEl = document.getElementById(marketId);
    if (marketEl) marketEl.innerHTML = '<p class="error">Error al conectar con la API.</p>';
  }
};

initApp();