// Client-side helpers for invoice creation and simple search UI
function initInvoicePage() {
  const addBtn = document.getElementById('addItem');
  const serviceSelect = document.getElementById('serviceSelect');
  const qtyInput = document.getElementById('qty');
  const itemsDiv = document.getElementById('items');
  const itemsInput = document.getElementById('itemsInput');
  const discountInput = document.getElementById('discount');
  const taxInput = document.getElementById('tax');
  const previewTotal = document.getElementById('previewTotal');
  const previewFinal = document.getElementById('previewFinal');

  if (!addBtn) return; // page doesn't have invoice form
  let items = [];

  function renderItems() {
    itemsDiv.innerHTML = '';
    let total = 0;
    items.forEach((it, idx) => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between border p-2 rounded';
      row.innerHTML = `<div>${it.name} — ₹${it.price.toFixed(2)} x ${it.qty}</div><div><button data-idx="${idx}" class="text-red-600">Remove</button></div>`;
      itemsDiv.appendChild(row);
      total += it.price * it.qty;
    });
    itemsInput.value = JSON.stringify(items.map(i => ({ serviceId: i.serviceId, qty: i.qty })));
    const disc = parseFloat(discountInput?.value || 0);
    const tax = parseFloat(taxInput?.value || 0);
    const afterDisc = Math.max(0, total - (disc || 0));
    const finalVal = afterDisc + (tax/100)*afterDisc;
    previewTotal.textContent = `Total: ₹${total.toFixed(2)}`;
    previewFinal.textContent = `Final: ₹${finalVal.toFixed(2)}`;
  }

  function removeHandler(e) {
    if (e.target.matches('button[data-idx]')) {
      const idx = Number(e.target.getAttribute('data-idx'));
      items.splice(idx, 1);
      renderItems();
    }
  }

  addBtn?.addEventListener('click', () => {
    const val = serviceSelect.value;
    if (!val) return;
    const [id, price] = val.split('|');
    const qty = Number(qtyInput.value) || 1;
    const name = serviceSelect.options[serviceSelect.selectedIndex].text.split(' — ')[0];
    items.push({ serviceId: id, name, price: Number(price), qty });
    renderItems();
  });

  itemsDiv?.addEventListener('click', removeHandler);
  discountInput?.addEventListener('input', renderItems);
  taxInput?.addEventListener('input', renderItems);
  renderItems();
}

document.addEventListener('DOMContentLoaded', initInvoicePage);
