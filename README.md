# Primetrade Backend Developer Assignment

This repository contains the completed assignment for the Backend Developer (Intern) position. 
It consists of a Scalable REST API built with Node.js/Express and a supportive Frontend UI built with React.js using Tailwind CSS.

## 🛠️ Required Software
*   Node.js (v18+)
*   MongoDB (A cloud MongoDB Atlas URI is pre-configured in the `.env` for your convenience, but you can change it to a local instance).

## 🚀 Setting Up the Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *The server will start on `http://localhost:5000`.*

**API Documentation:** Once the server is running, visit `http://localhost:5000/api-docs` to view the comprehensive Swagger documentation and test the endpoints directly.

## 🎨 Setting Up the Frontend
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Vite development server:
    ```bash
    npm run dev
    ```
    *The frontend will start, usually on `http://localhost:5173`.*

## 📂 Project Highlights
*   **Authentication:** Secure user registration and login with `bcryptjs` for password hashing and `jsonwebtoken` for stateless sessions.
*   **Role-Based Access Control:** Differentiates between `user` and `admin` roles, protecting specific admin routes (e.g., viewing all users).
*   **Task CRUD:** Complete Create, Read, Update, Delete functionality for Tasks bound to the authenticated user.
*   **Scalability Documented:** Please view the `scalability.md` file in the root directory for a discussion on scaling this application with Docker, Redis, and Load Balancers.
