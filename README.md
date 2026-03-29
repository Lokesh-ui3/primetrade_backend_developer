# 🚀 PrimeTrade – Enterprise-Grade Backend API & Web3 Dashboard

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

> **Live API Documentation:** Provided natively via Swagger UI  
> **Repository Focus:** Scalability, Security, and Seamless Assessor Experience

## 📖 Overview

While many beginner backend projects stop at simple CRUD operations, this system was engineered to reflect **real-world, production-ready backend architecture**. 

It demonstrates a deeply integrated understanding of secure stateless authentication, multi-layered authorization, maintainable API versioning, and developer experience (DX). Paired with this backend is a highly polished, custom-styled React frontend featuring a modern Web3/crypto interface to provide immediate visual context to the data.

---

## ⚡ What Sets This Project Apart?

Instead of requiring technical recruiters to waste time configuring cloud databases or pasting `.env` URLs, this project utilizes **`mongodb-memory-server`**. 
Upon starting the backend, the Node process automatically spins up a blazing-fast, isolated MongoDB database directly in the local RAM. **Zero setup required.**

Further highlights include:
*   **Granular Role-Based Access Control (RBAC):** True separation of concerns isolating `admin` privileges from standard `user` privileges.
*   **Ownership-Based Data Access:** Users can only query, modify, and delete the specific tasks they own.
*   **Live Console Logging:** Custom middleware logs all incoming HTTP traffic directly to the terminal with precise timestamps.
*   **Enterprise Structuring:** Strict separation of standard Routes, Business Logic, Models, and Middleware.

---

## 🔐 Authentication & Authorization Flow

Security is handled entirely via **JSON Web Tokens (JWT)** and **bcryptjs**.

1. **Authentication (Identity Check):** Passwords are cryptographically hashed before hitting the database. Upon login, a JWT is signed and returned. All protected endpoints mandate a valid `Bearer Token` in the authorization header.
2. **Authorization (Permission Check):** A custom `authorize(...roles)` middleware protects sensitive routes. For example, if a standard user attempts to hit the `/api/v1/admin/users` endpoint to scrape user data, the request is immediately rejected with a `403 Forbidden` status. 

*(Note: For the purpose of this internship assignment, a temporary "Account Role" dropdown was added to the Frontend Registration page so assessors can immediately test both viewpoints!).*

---

## 🗄️ Database Design

The schema leverages **Mongoose** strict typing, custom validators, and lifecycle hooks.

### `User` Collection
*   `name`: String (Required)
*   `email`: String (Required, Unique, Regex Validated)
*   `password`: String (Hashed, `select: false` natively to prevent accidental leakage)
*   `role`: Enum (`'user'` | `'admin'`), defaults to `'user'`

### `Task` Collection (Order Logs)
*   `title`: String (Required, Truncated at 100 chars)
*   `description`: String (Required, max 500 chars)
*   `status`: Enum (`'pending'` | `'completed'`), defaults to `'pending'`
*   `user`: ObjectId (Reference to the User Model)

---

## 🌐 API Architecture & Design

All routes are explicitly versioned (`/api/v1/`) to allow for seamless future iterations without breaking legacy clients. 

### Identity Routes
*   `POST /api/v1/auth/register` - Create an account
*   `POST /api/v1/auth/login` - Authenticate & retrieve JWT

### Task Routes (Requires Authentication JWT)
*   `GET /api/v1/tasks` - Retrieve tasks owned by the current user
*   `POST /api/v1/tasks` - Generate a new task
*   `PUT /api/v1/tasks/:id` - Update task parameters/status
*   `DELETE /api/v1/tasks/:id` - Destroy a specific task

### Administrative Routes (Requires 'Admin' Role)
*   `GET /api/v1/admin/users` - Retrieve a full roster of registered platform users.

---

## 🎨 Premium Frontend Integration

To effectively demonstrate the API without relying solely on Postman, a **Vite + React** frontend is provided. 
Instead of a generic template, it was custom-engineered to match the Primetrade aesthetic:
*   **Glassmorphism & Micro-animations:** Frost-glass panels, glowing interactive elements, and an animated gradient blob background.
*   **Dynamic UI Rendering:** The dashboard dynamically reshapes itself based on the JWT payload. If the token claims an `admin` role, the UI unwraps a hidden "Admin Roster" module fetching data from the protected backend routes.

---

## 🚀 Setup & Execution 

Because of the built-in memory server, launching this project takes less than 30 seconds. You will need two terminal windows.

### 1. Launch the Backend
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the server (Nodemon enabled)
npm run dev
```
> **Output:** `Server running on port 5000` | `Using In-Memory MongoDB Server for 0-setup testing.`

*Want to browse the API endpoints?* Visit **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)** to utilize the auto-generated Swagger UI!

### 2. Launch the Frontend
```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the Vite development build
npm run dev
```
> **Action:** Click the `http://localhost:5173` link provided in your terminal to view the application in your browser.

---

## 📈 Scalability Blueprint

While this system perfectly fulfills the assignment scope, production applications require heavier infrastructure. The codebase is structured so transitioning is trivial:

*   **Microservices:** The modular routes (`auth` vs `tasks` vs `admin`) can easily be decoupled into separate Node servers communicating via Kafka or RabbitMQ.
*   **Caching Layers:** Redis could be implemented in the controller layer to cache the `GET /api/v1/tasks` query, reducing load on the primary database for read-heavy operations.
*   **Containerization:** Both the `backend` and `frontend` can be containerized using Docker and scaled horizontally behind an AWS Application Load Balancer or an Nginx reverse proxy using clustering.
*   **Production DB Switching:** Simply providing an active `MONGO_URI` in the `.env` file immediately bypasses the testing memory-server and connects to a persistent, sharded MongoDB Atlas cluster.
