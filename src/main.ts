import './style.css';
import { getTopCoins } from './api/coinService';
import { renderMarket } from './ui/marketRenderer';

const initApp = async () => {
  const marketContainer = 'market-container';
  
  try {
    const container = document.getElementById(marketContainer);
    if (container) container.innerHTML = '<p>Cargando mercado...</p>';

    const coins = await getTopCoins();

    renderMarket(coins, marketContainer);

  } catch (error) {
    console.error(error);
    const container = document.getElementById(marketContainer);
    if (container) container.innerHTML = '<p>Error al cargar datos.</p>';
  }
};

initApp();

