# Shaloon Invoice Manager

A salon invoice management system with two implementations included in this repository.

## Projects

### `salon-invoice-mvc/` (Recommended)
A production-ready monolithic app built with **Express + EJS + MongoDB**.

- Session-based authentication
- Customer, Service & Invoice management
- Dashboard with search and date filters
- Print-friendly invoice view
- Tailwind CSS responsive design
- Seed script for sample data

**Quick start:**
```bash
cd salon-invoice-mvc
npm install
cp .env.example .env
npm run seed
npm run dev
```

Open **http://localhost:3000** and log in with `admin` / `admin123`.

See [`salon-invoice-mvc/README.md`](salon-invoice-mvc/README.md) for full documentation.

---

### `shaloon-invoice/` (Legacy)
A fullstack app built with **React 19 + Vite** (frontend) and **Express + MongoDB** (backend).

```bash
# Backend
cd shaloon-invoice/server
npm install
npm start

# Frontend
cd shaloon-invoice/client
npm install
npm run dev
```

---

## Repository Structure

```
shaloon-invoice-manager/
├── salon-invoice-mvc/   # Express + EJS (production-ready)
└── shaloon-invoice/     # React + Express (legacy)
```
