# Salon Invoice Management — MVC

> A minimal, production-ready MVC application for managing salon invoices, built with **Express**, **EJS**, and **MongoDB**.

---

## ✨ Features

- ✅ Manage Customers, Services, and Invoices (create, view, delete)
- ✅ Auto-generated, sequential invoice numbers
- ✅ Tax and discount calculations per invoice
- ✅ Dashboard with Today / This Week / This Month filters
- ✅ Full-text search across invoices and customers
- ✅ Clean, print-friendly invoice layout
- ✅ Session-based authentication with bcrypt password hashing
- ✅ REST API endpoints for external integrations
- ✅ Responsive design powered by Tailwind CSS

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js 18+ |
| Framework | Express 4.18 |
| Template Engine | EJS + express-ejs-layouts |
| Database | MongoDB via Mongoose 7 |
| Styling | Tailwind CSS (CDN) |
| Auth | express-session + bcrypt |
| Dev | nodemon |

---

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` as needed — defaults work with a local MongoDB instance:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/salon_invoice
SESSION_SECRET=your_secret_key
```

Default login credentials:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

### 3. Start MongoDB

**macOS (Homebrew):**
```bash
brew services start mongodb-community
```

**Docker:**
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```

### 4. Seed sample data

```bash
npm run seed
```

This creates:
- 2 sample customers
- 3 sample services
- 1 sample invoice
- 1 admin user account

### 5. Start the application

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser and log in.

---

## 📁 Project Structure

```
salon-invoice-mvc/
├── config/
│   └── db.js                   # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── customerController.js
│   ├── serviceController.js
│   └── invoiceController.js
├── models/
│   ├── Customer.js
│   ├── Invoice.js
│   ├── Service.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── customerRoutes.js
│   ├── serviceRoutes.js
│   └── invoiceRoutes.js
├── views/
│   ├── layout.ejs              # Base layout
│   ├── login.ejs
│   ├── dashboard.ejs
│   ├── customers.ejs
│   ├── services.ejs
│   ├── invoice_new.ejs
│   ├── invoice_detail.ejs
│   └── invoices_list.ejs
├── public/
│   └── js/main.js              # Client-side scripts
├── seed.js                     # Sample data seeder
├── server.js                   # Application entry point
├── .env.example
└── package.json
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/login` | Render login page |
| `POST` | `/auth/login` | Submit credentials |
| `GET` | `/auth/logout` | End session |

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | List all customers (HTML) |
| `POST` | `/customers` | Create a customer |
| `POST` | `/customers/delete/:id` | Delete a customer |
| `GET` | `/customers/api` | List all customers (JSON) |

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/services` | List all services (HTML) |
| `POST` | `/services` | Create a service |
| `POST` | `/services/delete/:id` | Delete a service |
| `GET` | `/services/api` | List all services (JSON) |

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/invoices` | Dashboard with filters (HTML) |
| `GET` | `/invoices/list` | All invoices (HTML) |
| `GET` | `/invoices/new` | New invoice form |
| `POST` | `/invoices/create` | Save a new invoice |
| `GET` | `/invoices/:id` | View invoice detail |
| `POST` | `/invoices/delete/:id` | Delete an invoice |
| `GET` | `/invoices/api/all` | All invoices (JSON) |
| `GET` | `/invoices/api/detail/:id` | Invoice detail (JSON) |

---

## 🐛 Troubleshooting

**MongoDB connection refused?**
```bash
brew services list                        # Check status
brew services start mongodb-community     # Start it
```

**Port 3000 in use?**
```bash
# Set a different port in .env
PORT=3001
```

**Module not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🌐 Production Deployment

Recommended steps before going live:

1. **Use MongoDB Atlas** — replace `MONGO_URI` in `.env` with your Atlas connection string
2. **Persistent sessions** — install `connect-mongo` and configure a MongoDB session store
3. **Reverse proxy** — serve behind Nginx or Caddy with HTTPS
4. **Environment hardening** — set a strong `SESSION_SECRET`, disable stack traces in errors
5. **Containerisation** — add a `Dockerfile` for consistent deployments
