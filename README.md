<div align="center">

# 💈 Shaloon Invoice Manager

**A professional, full-featured invoice management system built for modern salons and beauty businesses.**

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Shaloon Invoice Manager is a lightweight, production-ready web application designed to streamline billing operations for salons and beauty studios. It enables owners and staff to manage customers, define service catalogs, and generate professional invoices — all from a clean, browser-based interface.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure session-based login for staff |
| 👥 **Customer Management** | Add, view, and delete customer profiles |
| 💼 **Service Catalog** | Maintain a reusable list of services with pricing |
| 🧾 **Invoice Generation** | Create multi-service invoices with auto-numbering |
| 💰 **Tax & Discount** | Apply GST/tax and percentage-based discounts per invoice |
| 📊 **Dashboard** | Filterable dashboard with Today / This Week / This Month views |
| 🔍 **Search** | Full-text search across invoices and customers |
| 🖨️ **Print View** | Clean, print-friendly invoice layout |
| 📱 **Responsive UI** | Mobile-friendly design powered by Tailwind CSS |
| 🌱 **Seed Data** | One-command sample data population for quick demos |

---

## 🛠 Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express 4.18
- **Template Engine:** EJS (server-side rendering)
- **Database:** MongoDB via Mongoose 7
- **Styling:** Tailwind CSS (CDN)
- **Authentication:** express-session + bcrypt
- **Dev Tools:** nodemon

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Royalprincesingh/shaloon-invoice-manager.git
cd shaloon-invoice-manager/salon-invoice-mvc
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Open `.env` and update values as needed:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/salon_invoice
SESSION_SECRET=your_secret_key
```

**4. Start MongoDB** (skip if using Atlas)

```bash
# macOS with Homebrew
brew services start mongodb-community

# Using Docker
docker run -d -p 27017:27017 --name mongo mongo:latest
```

**5. Seed sample data**

```bash
npm run seed
```

This creates 2 sample customers, 3 services, 1 invoice, and an admin account.

**6. Start the application**

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser and log in with:

| Field | Value |
|---|---|
| Username | `admin` |
| Password | `admin123` |

---

## 💡 Usage

1. **Log in** using the admin credentials above.
2. Navigate to **Customers** to add your clients.
3. Navigate to **Services** to define your offerings (e.g., Haircut ₹200, Facial ₹500).
4. Click **New Invoice**, select a customer and services, and save.
5. View, print, or delete invoices from the **Invoices** section.

---

## 📁 Project Structure

```
shaloon-invoice-manager/
└── salon-invoice-mvc/          # Main application
    ├── config/
    │   └── db.js               # MongoDB connection
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
    │   ├── layout.ejs
    │   ├── login.ejs
    │   ├── dashboard.ejs
    │   ├── customers.ejs
    │   ├── services.ejs
    │   ├── invoice_new.ejs
    │   ├── invoice_detail.ejs
    │   └── invoices_list.ejs
    ├── public/
    │   └── js/main.js          # Client-side scripts
    ├── seed.js                  # Sample data seeder
    ├── server.js                # Application entry point
    ├── .env.example
    └── package.json
```

---

## 📡 API Reference

The app exposes lightweight JSON endpoints for integrations alongside its HTML views.

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/auth/login` | Render login page |
| `POST` | `/auth/login` | Submit login credentials |
| `GET` | `/auth/logout` | Log out current session |

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

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

Please follow conventional commit messages and ensure your code runs cleanly before submitting.

---

## 🐛 Troubleshooting

**MongoDB connection refused?**
```bash
# Check MongoDB status
brew services list

# Start MongoDB
brew services start mongodb-community
```

**Port 3000 already in use?**
```bash
# Update PORT in .env
PORT=3001
```

**Module not found errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Made with ❤️ for salon owners everywhere
</div>
