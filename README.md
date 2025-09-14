# ReelsPRO

> A modern, full-stack video sharing platform built with Next.js, React, and TypeScript.

## Overview

ReelsPRO enables users to securely upload, stream, and manage videos with a responsive and scalable interface. The platform integrates advanced authentication, optimized media handling, and a modular architecture for maintainability.

## Features

- Secure user authentication (NextAuth.js)
- Video upload, processing, and streaming
- RESTful API endpoints
- Responsive and accessible UI
- ImageKit integration for media optimization
- User registration and session management
- Component-based architecture

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, PostCSS
- **Backend:** Next.js API routes, MongoDB (Mongoose)
- **Authentication:** NextAuth.js
- **Media:** ImageKit
- **Other:** ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance
- ImageKit account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/srm04072024/ReelsPRO_srm.git
   cd reelspro
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your MongoDB URI, NextAuth secret, and ImageKit credentials.
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Access the app at [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
app/         # Application pages & API routes
components/  # Reusable React components
lib/         # Utility libraries (API client, auth, db)
models/      # Mongoose models
public/      # Static assets
```

## License

This project is licensed under the MIT License.
