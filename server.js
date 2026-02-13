require('dotenv').config();
const express = require('express');
const path = require('path');
const Stripe = require('stripe');

const app = express();
const port = Number(process.env.PORT || 4242);

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY in environment. Checkout will fail until set.');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

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

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/products', (_req, res) => {
  res.json(products);
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        message: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env.'
      });
    }

    const product = products.find((item) => item.id === req.body.productId);

    if (!product) {
      return res.status(400).json({ message: 'Product not found.' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.image]
            },
            unit_amount: product.unitAmount
          }
        }
      ],
      success_url: `${baseUrl}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel.html`
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Unable to create checkout session.'
    });
  }
});

app.get('/success.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

app.get('/cancel.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cancel.html'));
});

app.listen(port, () => {
  console.log(`Trade Me Bro running on ${baseUrl}`);
});
