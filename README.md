# Shaloon Invoice Manager

A simple and efficient invoice management system designed for salons and beauty parlours. Track services, manage client billing, and generate professional invoices with ease.

## Features

- **Invoice Creation** – Create detailed invoices for salon services
- **Client Management** – Store and manage client information
- **Service Catalogue** – Maintain a list of services with pricing
- **Invoice History** – View and search past invoices
- **PDF Export** – Download invoices as PDF for sharing with clients

## Tech Stack

> Update this section with the actual technologies used once the project code is added.

- Frontend: (e.g. React / HTML / CSS)
- Backend: (e.g. Node.js / Express)
- Database: (e.g. MongoDB / MySQL)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Royalprincesingh/shaloon-invoice-manager.git
   cd shaloon-invoice-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy the example env file and update the values:

   ```bash
   cp .env.example .env
   ```

4. **Start the application**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. Open the app in your browser.
2. Add your salon's services and their prices under **Services**.
3. Select a client and the services they received, then click **Generate Invoice**.
4. Download or print the invoice directly from the app.

## Project Structure

```
shaloon-invoice-manager/
├── src/
│   ├── components/    # UI components
│   ├── pages/         # Application pages/views
│   ├── services/      # Business logic and API calls
│   └── utils/         # Helper utilities
├── public/            # Static assets
├── .env.example       # Environment variable template
└── package.json
```

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

**Royalprincesingh** – [GitHub Profile](https://github.com/Royalprincesingh)
