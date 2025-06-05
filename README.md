# Ethereum Transaction Crawler

A web application that allows users to explore and visualize Ethereum blockchain transactions for any given wallet address. Built with Vue 3, TypeScript, and Vite for the frontend, with a backend service in Node (in another repo) that interfaces with Etherscan and Infura APIs.

## 🌟 Features

- View all transactions for any Ethereum wallet address from a specific block number
- Display transaction details including:
  - Sender and receiver addresses
  - ETH amounts transferred
  - Transaction timestamps
- Historical balance lookup by date

## 🌐 Public Access

The application is publicly accessible at:

- **Frontend**: [https://bogdank0451.github.io/origin-trail-frontend/](https://bogdank0451.github.io/origin-trail-frontend/)
- **Backend**: [https://backend-seven-iota-81.vercel.app/](https://backend-seven-iota-81.vercel.app/)

You can directly access the backend endpoints in your browser using the following examples. Replace the placeholder values with your desired Ethereum wallet address, block number, or date:

- **Transactions**: `https://backend-seven-iota-81.vercel.app/transactions/<wallet-address>/<start-block>?page=<page-number>&itemsPerPage=<items-per-page>`
  - Example: `https://backend-seven-iota-81.vercel.app/transactions/0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f/9000000?page=1&itemsPerPage=25`
  - `<wallet-address>`: The Ethereum wallet address (e.g., `0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f`).
  - `<start-block>`: The starting block number (e.g., `9000000`).
  - `<page-number>`: The page of results (e.g., `1`).
  - `<items-per-page>`: Number of transactions per page (e.g., `25`).

- **Balance**: `https://backend-seven-iota-81.vercel.app/balance/<wallet-address>/<date>`
  - Example: `https://backend-seven-iota-81.vercel.app/balance/0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f/2025-06-04`
  - `<wallet-address>`: The Ethereum wallet address (e.g., `0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f`).
  - `<date>`: The date in YYYY-MM-DD format (e.g., `2025-06-04`).

## 🏗️ Architecture

The application consists of two main components:

### Frontend (This Repository)
- Vue 3 with Composition API
- TypeScript for type safety
- Vuetify 3 for Material Design components
- Vue Router for navigation
- Pinia for state management
- Vue I18n for internationalization
- Axios for API communication

### Backend (https://github.com/BogdanK0451/origin-trail-backend)
- Interfaces with Etherscan and Infura APIs
- Handles blockchain data fetching and processing
- Provides RESTful API endpoints for the frontend

## 🛠️ Development Setup

### Prerequisites

- Node.js (this was made on v20.18.0)
- pnpm (should work with npm too but i haven't tried)
- Could be useful to set env variable on the system NODE_ENV=development, but theres an else branch in the code which should make the code behave as if we're in development mode incase it isn't set (so don't set it unless something doesn't work :) ) .

### Installation

1. Clone the repositories
```bash
git clone https://github.com/BogdanK0451/origin-trail-frontend.git
git clone https://github.com/BogdanK0451/origin-trail-backend.git
```

2. Install dependencies in both
```bash
pnpm install
```

3. Start the development server (frontend)
```bash
pnpm dev
```
4. Start the development server (backend)
```bash
pnpm start
```


## 📱 Usage

- On the transactions page
1. Enter an Ethereum wallet address in the search field
2. Specify the starting block number
3. Click "Search" to fetch and display transactions
4. Use the arrows to fetch new pages (too much data to be fetched at once)
- On the balance page
1. Enter an Ethereum wallet address in the search field
2. Pick a date for which you want to check the eth balance of the wallet address



## 🛡️ Development Tools

- ESLint for code linting
- Prettier for code formatting
- Husky for git hooks
- Commitlint for commit message validation
- TypeScript for type checking

## 📦 Dependencies

### Core Dependencies
- Vue 3
- Vuetify 3
- Pinia
- Vue Router
- Vue I18n
- Axios
- VueUse

### Development Dependencies
- TypeScript
- Vite
- ESLint
- Prettier
- Husky
- Commitlint

## 🔑 API Keys

To use this application, you'll need:

1. Etherscan API Key
   - Register at https://etherscan.io/apis
   - Create a new API key
   - Add it to the `.env.development` file in the backend repo

2. Infura API Key
   - Register at https://infura.io/
   - Create a new API key
   - Add it to the `.env.development` file in the backend repo


## Thoughts
    - Had some issues with etherscan api when i wanted to use ethereum json rpc eth_getBalanced for historical balance checking (it should be available but ..it didn't work), so i had to use infura api (after, first, getting the closest blockchain block to the date-time specified by the user)
    - Wasn't sure if dealing with the timezone was important, so i just took the users timezone date-time and cut the time off. 
    - Had issues with CORS on vercel, so i just let requests from all origins in, even though i wouldn't do that in practice.
    - Api keys shouldn't be exposed like that on the backend..but for the sake of saving time they're public on github.
    - Didn't setup an linter and husky/commitlint on backend, for the sake of saving time.