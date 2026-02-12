# Modern React Application - Chat App

This project is a frontend web application built with **React 19**, **TypeScript**, and **Vite**. It utilizes **Material UI** for component styling and **TanStack Query** for efficient server state management.

## 🛠 Tech Stack

- **Core:** React 19, TypeScript 5.9
- **Build Tool:** Vite 7
- **UI Framework:** Material UI (MUI) v7 + Emotion
- **Data Fetching:** TanStack Query (React Query) & Axios
- **Code Quality:** ESLint 9 (Flat Config) & Prettier
- **Package Manager:** pnpm

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** installed on your machine.
This project relies on **pnpm** for dependency management.

### Installation

1. Clone the repository.
2. Install dependencies using pnpm:
```bash
pnpm install
```

### Running Development Server

To start the development server with Hot Module Replacement (HMR):
```bash
pnpm dev
```
The application will typically be available at `http://localhost:5173`.

## ⚙️ Configuration

### API Proxy
The Vite configuration includes a proxy for `/api` requests to avoid CORS issues during development.
By default, it proxies requests to `http://localhost:3000`.

You can configure the target backend port using an environment variable:
- `VITE_API_PORT`: Overrides the default backend port (3000).

## 💅 Linting & Formatting

To ensure code consistency, this project uses **ESLint** combined with **Prettier**.

- **Linting:** Checks for code errors and best practices.
- **Formatting:** Handles code style (indentation, quotes, etc.).

If you have integrated Prettier with your IDE (e.g., WebStorm or VS Code), formatting should happen automatically or on save.

## 📦 Building for Production

To create a production-ready build:
```bash
bash pnpm build
```
The build artifacts will be stored in the `dist/` directory.

## 📂 Project Structure

```text
.
├── AppEntry.txt
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   └── vite.svg
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── httpClient.ts
│   │   └── messages.ts
│   ├── components
│   │   ├── container
│   │   │   └── chat-container.tsx
│   │   ├── form
│   │   │   ├── header.tsx
│   │   │   ├── message-input.tsx
│   │   │   └── user-dialog.tsx
│   │   ├── message-bubble.tsx
│   │   ├── message-list.tsx
│   │   └── utils
│   │       └── utils.ts
│   ├── hooks
│   │   └── useMessages.hook.ts
│   ├── main.tsx
│   ├── theme
│   │   └── theme.ts
│   └── types
│       └── message.types.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite-env.d.ts
└── vite.config.ts

11 directories, 26 files

```
