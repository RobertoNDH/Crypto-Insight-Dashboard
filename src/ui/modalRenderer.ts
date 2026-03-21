import type { Coin } from '../types/crypto';

export const renderPurchaseModal = (coin: Coin, onConfirm: (amount: number) => void) => {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  modalOverlay.innerHTML = `
    <div class="modal-content">
      <h2>Comprar ${coin.name}</h2>
      <p>Precio actual: <strong>${formatter.format(coin.currentPrice)}</strong></p>
      
      <div class="form-group">
        <label for="buy-amount">Cantidad a comprar:</label>
        <input type="number" id="buy-amount" step="0.0001" min="0.0001" placeholder="0.00">
      </div>

      <p class="total-preview">Total: <span id="total-cost">$0.00</span></p>

      <div class="modal-actions">
        <button id="btn-cancel" class="btn-secondary">Cancelar</button>
        <button id="btn-confirm" class="btn-primary" disabled>Confirmar Compra</button>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  const input = modalOverlay.querySelector('#buy-amount') as HTMLInputElement;
  const btnConfirm = modalOverlay.querySelector('#btn-confirm') as HTMLButtonElement;
  const totalDisplay = modalOverlay.querySelector('#total-cost') as HTMLElement;

  input.addEventListener('input', () => {
    const amount = input.valueAsNumber;
    
    if (amount > 0) {
      btnConfirm.disabled = false;
      totalDisplay.textContent = formatter.format(amount * coin.currentPrice);
    } else {
      btnConfirm.disabled = true;
      totalDisplay.textContent = '$0.00';
    }
  });

  modalOverlay.querySelector('#btn-cancel')?.addEventListener('click', () => modalOverlay.remove());

  btnConfirm.addEventListener('click', () => {
    onConfirm(input.valueAsNumber);
    modalOverlay.remove();
  });
};