# Salon Invoice Management (MVC)

Minimal production-ready MVC app using Express, EJS and MongoDB.

## Features
- ✓ Manage Customers, Services, Invoices (create, view, delete)
- ✓ Auto-generated invoice numbers
- ✓ Tax and discount calculations
- ✓ Search and date filters (today/week/month)
- ✓ Print-friendly invoice view
- ✓ Session-based authentication
- ✓ REST API endpoints for integrations
- ✓ Responsive Tailwind CSS design

## Setup

### 1. Install dependencies

```bash
cd salon-invoice-mvc
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env if needed - default uses local MongoDB
```

Default credentials:
- Username: `admin`
- Password: `admin123`

### 3. Start MongoDB (if not running)

**On macOS with Homebrew:**
```bash
brew services start mongodb-community
```

**Using Docker:**
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
- Admin user account

### 5. Start the app

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Open **http://localhost:3000** and login

## Project Structure

```
salon-invoice-mvc/
  ├── config/
  │   └── db.js              # MongoDB connection
  ├── models/
  │   ├── Customer.js
  │   ├── Service.js
  │   ├── Invoice.js
  │   └── User.js
  ├── controllers/
  │   ├── authController.js
  │   ├── customerController.js
  │   ├── serviceController.js
  │   └── invoiceController.js
  ├── routes/
  │   ├── authRoutes.js
  │   ├── customerRoutes.js
  │   ├── serviceRoutes.js
  │   └── invoiceRoutes.js
  ├── views/
  │   ├── layout.ejs          # Base layout
  │   ├── login.ejs
  │   ├── dashboard.ejs
  │   ├── customers.ejs
  │   ├── services.ejs
  │   ├── invoice_new.ejs
  │   ├── invoice_detail.ejs
  │   └── invoices_list.ejs
  ├── public/
  │   └── js/main.js          # Client-side logic
  ├── server.js               # Entry point
  ├── seed.js                 # Sample data
  └── package.json
```

## API Endpoints

### Auth
- `GET /auth/login` - Login page
- `POST /auth/login` - Login
- `GET /auth/logout` - Logout

### Customers
- `GET /customers` - List customers
- `POST /customers` - Add customer
- `POST /customers/delete/:id` - Delete customer
- `GET /customers/api` - JSON list

### Services
- `GET /services` - List services
- `POST /services` - Add service
- `POST /services/delete/:id` - Delete service
- `GET /services/api` - JSON list

### Invoices
- `GET /invoices` - Dashboard (filtered list)
- `GET /invoices/new` - Create form
- `POST /invoices/create` - Save invoice
- `GET /invoices/list` - All invoices
- `GET /invoices/:id` - View invoice
- `POST /invoices/delete/:id` - Delete invoice
- `GET /invoices/api/all` - JSON list
- `GET /invoices/api/detail/:id` - JSON detail

## Troubleshooting

**MongoDB connection refused?**
- Verify MongoDB is running: `brew services list`
- Start it: `brew services start mongodb-community`

**Port 3000 already in use?**
```bash
# Change in .env:
PORT=3001
```

**Modules not found?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

For production, consider:
1. Use MongoDB Atlas instead of local DB
2. Switch session store: `npm install connect-mongo`
3. Add Dockerfile for containerization
4. Use environment-specific configs
