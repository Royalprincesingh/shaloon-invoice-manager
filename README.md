<div align="center">

# 💇 Shaloon Invoice Manager

### A professional Salon Invoice Management System

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> Manage customers, services, and invoices for your salon — fast, clean, and ready to deploy.

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Quick Start](#-quick-start)
- [Project Comparison](#-project-comparison)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**Shaloon Invoice Manager** is a full-featured billing and invoice management system built specifically for salons and beauty parlors. It enables salon owners to maintain a customer database, define a service catalog, and instantly generate professional invoices — complete with tax, discount, and status tracking.

This repository contains **two implementations** of the same product:

| Project | Stack | Status |
|---------|-------|--------|
| [`salon-invoice-mvc/`](salon-invoice-mvc/) | Express + EJS + MongoDB | ✅ **Recommended – Production Ready** |
| [`shaloon-invoice/`](shaloon-invoice/) | React 19 + Vite + Express + MongoDB | ⚠️ Legacy |

---

## ✨ Features

### 🔐 Authentication
- Secure session-based login (MVC) / JWT-based login (React)
- Bcrypt password hashing
- Protected routes — all pages require authentication

### 👥 Customer Management
- Add, view, and delete customers
- Store name, phone, and email
- Search customers by name or phone number

### 🛎️ Service Catalog
- Define salon services (haircut, coloring, facial, etc.)
- Set description and price per service
- Reusable across all invoices

### 🧾 Invoice Engine
- Select customer + multiple services with quantities
- Apply **discount** amount and **tax** percentage
- Auto-calculates subtotal → discount → tax → **final amount**
- Auto-generated unique invoice numbers (`INV-XXXXXX-XXX`)
- Track invoice status: **Paid / Unpaid**

### 📊 Dashboard
- Browse all invoices with live search
- Filter by: **Today**, **Last 7 Days**, **Last 30 Days**
- One-click view, print, or delete

### 🖨️ Print-Friendly Invoices
- Clean, professional invoice layout
- Optimized for both screen and print

### 📱 Responsive Design
- Mobile-first Tailwind CSS layout
- Works on desktop, tablet, and phone

---

## 🛠️ Tech Stack

### Production App — `salon-invoice-mvc/`

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express 4.18 |
| Templating | EJS + Express-EJS-Layouts |
| Database | MongoDB 7 via Mongoose |
| Auth | express-session + bcrypt |
| Styling | Tailwind CSS (CDN) |
| Dev Tools | Nodemon |

### Legacy App — `shaloon-invoice/`

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router 7 |
| HTTP Client | Axios |
| PDF Export | jsPDF |
| Notifications | React Hot Toast |
| Backend | Express 5.2 |
| Database | MongoDB 9 via Mongoose |
| Auth | JSON Web Tokens (JWT) |

---

## 📁 Repository Structure

```
shaloon-invoice-manager/
│
├── salon-invoice-mvc/              # ✅ Production-ready MVC app
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── models/
│   │   ├── Customer.js
│   │   ├── Service.js
│   │   ├── Invoice.js
│   │   └── User.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   ├── serviceController.js
│   │   └── invoiceController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── invoiceRoutes.js
│   ├── views/                     # EJS templates
│   │   ├── layout.ejs
│   │   ├── login.ejs
│   │   ├── dashboard.ejs
│   │   ├── invoice_new.ejs
│   │   ├── invoice_detail.ejs
│   │   ├── customers.ejs
│   │   └── services.ejs
│   ├── public/
│   │   └── js/main.js             # Client-side scripts
│   ├── server.js                  # App entry point
│   ├── seed.js                    # Sample data seeder
│   ├── .env.example
│   └── package.json
│
└── shaloon-invoice/               # ⚠️ Legacy React app
    ├── server/                    # Express REST API
    └── client/                    # React 19 + Vite SPA
```

---

## 🚀 Quick Start

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) running locally **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) URI

### 1 — Clone the repo

```bash
git clone https://github.com/Royalprincesingh/shaloon-invoice-manager.git
cd shaloon-invoice-manager
```

### 2 — Set up the production app

```bash
cd salon-invoice-mvc
npm install
cp .env.example .env        # Edit if needed
```

### 3 — Start MongoDB (if not running)

```bash
# macOS (Homebrew)
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongo mongo:latest
```

### 4 — Seed sample data

```bash
npm run seed
```

Creates: 1 admin user, 2 sample customers, 3 services, 1 invoice.

### 5 — Launch the app

```bash
npm run dev          # Development (auto-reload)
# or
npm start            # Production
```

Open **[http://localhost:3000](http://localhost:3000)** and log in:

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## ⚖️ Project Comparison

| Feature | `salon-invoice-mvc` | `shaloon-invoice` |
|---------|---------------------|-------------------|
| Status | ✅ Production Ready | ⚠️ Legacy / Incomplete |
| Architecture | Monolithic (single process) | Distributed (client + server) |
| Frontend | EJS server-rendered | React 19 SPA |
| Auth | Session-based | JWT |
| Bundle Size | ~232 KB | ~250 MB |
| Sample Data | ✅ Full seed script | ⚠️ Partial |
| Documentation | ✅ Complete | ❌ None |
| Deployment | Single `node server.js` | Separate client + server |

---

## 📡 API Reference

All endpoints require an active session (login first).

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/login` | Show login page |
| `POST` | `/auth/login` | Submit credentials |
| `GET` | `/auth/logout` | End session |

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | List all customers |
| `POST` | `/customers` | Add a new customer |
| `POST` | `/customers/delete/:id` | Remove a customer |
| `GET` | `/customers/api` | JSON list of customers |

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/services` | List all services |
| `POST` | `/services` | Add a new service |
| `POST` | `/services/delete/:id` | Remove a service |
| `GET` | `/services/api` | JSON list of services |

### Invoices

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/invoices` | Dashboard (filtered list) |
| `GET` | `/invoices/new` | New invoice form |
| `POST` | `/invoices/create` | Save a new invoice |
| `GET` | `/invoices/:id` | View invoice detail |
| `POST` | `/invoices/delete/:id` | Delete an invoice |
| `GET` | `/invoices/api/all` | JSON list of all invoices |
| `GET` | `/invoices/api/detail/:id` | JSON detail of one invoice |

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` inside `salon-invoice-mvc/` and adjust as needed:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/salon_invoice
SESSION_SECRET=change-this-to-a-random-secret
ADMIN_USER=admin
ADMIN_PASS=admin123
```

---

## 🔧 Troubleshooting

<details>
<summary><strong>MongoDB connection refused</strong></summary>

```bash
# Check if MongoDB is running
brew services list          # macOS
sudo systemctl status mongod  # Linux

# Start it
brew services start mongodb-community   # macOS
sudo systemctl start mongod             # Linux
```

</details>

<details>
<summary><strong>Port 3000 already in use</strong></summary>

Change the port in `.env`:

```env
PORT=3001
```

</details>

<details>
<summary><strong>Module not found / dependency issues</strong></summary>

```bash
rm -rf node_modules package-lock.json
npm install
```

</details>

---

## 🌐 Deployment

### MongoDB Atlas (Recommended for production)

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Copy the connection string and set it in `.env`:
   ```env
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/salon_invoice
   ```

### Persistent Session Store

Install `connect-mongo` to survive server restarts:

```bash
npm install connect-mongo
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY salon-invoice-mvc/ .
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t shaloon-invoice .
docker run -p 3000:3000 --env-file salon-invoice-mvc/.env shaloon-invoice
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ for salon owners everywhere

</div>
