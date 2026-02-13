const products = [
  {
    id: 'wireless-headphones',
    name: 'Wireless Headphones',
    description: 'Noise-canceling over-ear headphones.',
    unitAmount: 12999,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'mechanical-keyboard',
    name: 'Mechanical Keyboard',
    description: 'RGB 75% keyboard with hot-swappable switches.',
    unitAmount: 8999,
    image:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'desk-lamp',
    name: 'Smart Desk Lamp',
    description: 'Dimmable LED lamp with ambient presets.',
    unitAmount: 4999,
    image:
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80'
  }
];

const grid = document.getElementById('product-grid');

function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100);
}

function renderProducts() {
  grid.innerHTML = products
    .map(
      (product) => `
      <article class="card">
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${formatPrice(product.unitAmount)}</p>
        <button data-product-id="${product.id}">Buy with Stripe (Test)</button>
      </article>
    `
    )
    .join('');
}

async function checkout(productId) {
  const button = document.querySelector(`[data-product-id="${productId}"]`);
  const originalText = button.textContent;

  try {
    button.disabled = true;
    button.textContent = 'Redirecting...';

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Checkout session failed');
    }

    const data = await response.json();
    window.location.href = data.url;
  } catch (error) {
    alert(`Error: ${error.message}`);
    button.disabled = false;
    button.textContent = originalText;
  }
}

renderProducts();

grid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-product-id]');
  if (!button) return;
  checkout(button.dataset.productId);
});
