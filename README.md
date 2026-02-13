# Trade Me Bro — Mock Retail Portfolio Site

A full-stack mock retail web app for portfolio use, featuring:
- A storefront frontend
- An Express backend
- Stripe test checkout integration

## Tech Stack
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js + Express
- **Payments:** Stripe Checkout (test mode)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment template:
   ```bash
   cp .env.example .env
   ```
3. Add your Stripe test keys in `.env`:
   - `STRIPE_SECRET_KEY` from Stripe Developers dashboard
   - `STRIPE_PUBLISHABLE_KEY` from Stripe Developers dashboard
4. Start the app:
   ```bash
   npm start
   ```
5. Visit `http://localhost:4242`

## Stripe Test Cards
Use Stripe's test card:
- Card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any ZIP

## Project Structure
- `server.js` — API + static file hosting
- `public/index.html` — storefront page
- `public/style.css` — page styling
- `public/app.js` — product rendering + checkout request

## Important
This is a **mock** portfolio project. It uses Stripe **test mode** and does not process real payments.
