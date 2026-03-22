<div align="center">

# 💈 Shaloon Invoice Manager

**A professional, full-featured invoice management system built for modern salons and beauty businesses.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](CONTRIBUTING.md)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Project Comparison](#-project-comparison)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Shaloon Invoice Manager** is a lightweight, production-ready web application designed to streamline billing operations for salons and beauty studios. It enables owners and staff to manage customers, define service catalogs, and generate professional invoices — all from a clean, browser-based interface.

This repository contains **two implementations** of the same product:

| Project | Stack | Status |
|---------|-------|--------|
| [`salon-invoice-mvc/`](salon-invoice-mvc/) | Express + EJS + MongoDB | ✅ **Recommended — Production Ready** |
| [`shaloon-invoice/`](shaloon-invoice/) | React 19 + Vite + Express + MongoDB | ⚠️ Legacy |

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure session-based login for staff |
| 👥 **Customer Management** | Add, view, and delete customer profiles |
| 💼 **Service Catalog** | Maintain a reusable list of services with pricing |
| 🧾 **Invoice Generation** | Create multi-service invoices with auto-numbering |
| 💰 **Tax & Discount** | Apply GST/tax and discount amounts per invoice |
| 📊 **Dashboard** | Filterable dashboard with Today / This Week / This Month views |
| 🔍 **Search** | Full-text search across invoices and customers |
| 🖨️ **Print View** | Clean, print-friendly invoice layout |
| 📱 **Responsive UI** | Mobile-friendly design powered by Tailwind CSS |
| 🌱 **Seed Data** | One-command sample data population for quick demos |

---

## 🛠️ Tech Stack

### Production App — `salon-invoice-mvc/`

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express 4.18 |
| Templating | EJS + express-ejs-layouts |
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
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── customerController.js
│   │   ├── serviceController.js
│   │   └── invoiceController.js
│   ├── models/
│   │   ├── Customer.js
│   │   ├── Invoice.js
│   │   ├── Service.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── invoiceRoutes.js
│   ├── views/                     # EJS templates
│   │   ├── layout.ejs
│   │   ├── login.ejs
│   │   ├── dashboard.ejs
│   │   ├── customers.ejs
│   │   ├── services.ejs
│   │   ├── invoice_new.ejs
│   │   ├── invoice_detail.ejs
│   │   └── invoices_list.ejs
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

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1 — Clone the repository

```bash
git clone https://github.com/Royalprincesingh/shaloon-invoice-manager.git
cd shaloon-invoice-manager/salon-invoice-mvc
```

### 2 — Install dependencies

```bash
npm install
```

### 3 — Configure environment variables

```bash
cp .env.example .env
```

### 4 — Start MongoDB (skip if using Atlas)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Docker
docker run -d -p 27017:27017 --name mongo mongo:latest
```

### 5 — Seed sample data

```bash
npm run seed
```

Creates: 1 admin user, 2 sample customers, 3 services, 1 invoice.

### 6 — Launch the app

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

## 💡 Usage

1. **Log in** using the admin credentials above.
2. Navigate to **Customers** to add your clients.
3. Navigate to **Services** to define your offerings (e.g., Haircut ₹200, Facial ₹500).
4. Click **New Invoice**, select a customer and services, and save.
5. View, print, or delete invoices from the **Invoices** dashboard.

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

All endpoints require an active session (log in first).

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/login` | Render login page |
| `POST` | `/auth/login` | Submit login credentials |
| `GET` | `/auth/logout` | End session |

### Customers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | List all customers (HTML) |
| `POST` | `/customers` | Create a new customer |
| `POST` | `/customers/delete/:id` | Delete a customer |
| `GET` | `/customers/api` | List all customers (JSON) |

### Services

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/services` | List all services (HTML) |
| `POST` | `/services` | Create a new service |
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
brew services list             # macOS
sudo systemctl status mongod   # Linux

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

### MongoDB Atlas (recommended for production)

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Replace `MONGO_URI` in `.env`:
   ```env
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/salon_invoice
   ```

### Persistent Session Store

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

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ for salon owners everywhere
</div>
