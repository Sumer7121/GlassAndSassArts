# Glass & Sass Arts

Glass & Sass Arts is a React/Vite storefront and admin panel backed by an Express, MongoDB, and Cloudinary API.

## Applications

- `frontend/` — public storefront
- `admin/` — product and order management panel
- `backend/` — authentication, product, cart, order, and Stripe API

## Local setup

Create local environment files from the `.env.example` files. Keep all real credentials out of Git.

```sh
cd backend && npm ci && npm start
cd frontend && npm ci && npm run dev
cd admin && npm ci && npm run dev
```

The API requires a MongoDB connection and a JWT secret. Cloudinary credentials are needed for uploading product images, and a Stripe secret key is needed for online checkout.

## Render deployment

The root `render.yaml` defines the API, storefront, and admin static site. It uses the free web-service plan to avoid creating a paid resource. Render prompts for the database, admin, Cloudinary, and Stripe values during initial Blueprint setup. Use newly rotated credentials; do not reuse values that were committed in the old `.env` files.

The public and admin Vite sites receive the API URL from the Blueprint service reference. The frontend uses the `/verify` route for Stripe checkout returns.
