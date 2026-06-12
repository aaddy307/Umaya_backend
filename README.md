# Umaya - Elevate Your Energy Backend

Express.js backend API for the Umaya crystal e-commerce showcase website.

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your configuration values.

3. **Seed the database**
   ```bash
   npm run seed
   ```
   This creates 10 sample products and an admin user.

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - List all products (?category=, ?search=, ?featured=true)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - List all messages (admin only)

### Admin
- `POST /api/admin/login` - Login, returns JWT token

## Authentication

Protected routes require header: `Authorization: Bearer <token>`

## Scripts

- `npm run dev` - Start with nodemon
- `npm start` - Start normally
- `npm run seed` - Seed database# Umaya_backend
