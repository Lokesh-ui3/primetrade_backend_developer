# Primetrade Backend Developer Assignment

![Application Overview](https://img.shields.io/badge/Stack-MERN-blue.svg)
![Status](https://img.shields.io/badge/Status-Completed-success.svg)

This repository contains my submission for the **Backend Developer (Intern)** assignment at Primetrade. It consists of a robust, scalable REST API natively integrated with a sleek, custom-built React frontend.

---

## 🛠️ Technology Stack

*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (`mongodb-memory-server` & `mongoose`)
*   **Authentication:** JSON Web Tokens (JWT) & `bcryptjs`
*   **Documentation:** Swagger UI
*   **Frontend:** React.js, Vite, Tailwind CSS (Custom Web3 aesthetic)

---

## ✨ Key Features

*   **Zero-Setup Testing Environment:** Integrated an automatic *In-Memory MongoDB Database*. Reviewers do not need to configure complex database URIs; the backend will automatically spin up its own database in your RAM to allow for immediate testing!
*   **Secure Authentication:** User passwords are encrypted before being stored using bcrypt. Authorized endpoints generate and consume secure JWTs.
*   **Role-Based Access Control (RBAC):** Users are separated by roles (`user` vs `admin`). Custom middleware explicitly prevents standard users from executing administrative endpoints. 
*   **Task Management CRUD:** Fully functional Create, Read, Update, and Delete endpoints for a "Task" entity, locked to the authenticated user.
*   **Interactive Admin Panel:** The frontend dynamically displays an advanced "User Roster" grid *only* if you are logged in as an Admin.

---

## 🚀 How to Run Locally

You will need to open **two separate terminal windows**. Ensure you have Node.js (v18+) installed.

### 1. Start the Backend API
```bash
# Navigate to the backend directory
cd backend

# Install all backend dependencies
npm install

# Start the development server
npm run dev
```
> You will see a message confirming: `Using In-Memory MongoDB Server for 0-setup testing. MongoDB Connected!`. The server runs on `http://localhost:5000`.

### 2. Start the Frontend Application
```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install all frontend dependencies
npm install

# Start the Vite development server
npm run dev
```
> The frontend will launch. Open `http://localhost:5173` in your browser.

---

## 📖 API Documentation (Swagger)

All backend endpoints are structurally documented using Swagger. While the backend server is running, simply navigate to:

👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)** 

---

## 🧪 Testing the Role-Based Access Control (RBAC)

To make grading this assignment effortless, I have temporarily exposed the ability to **select your Account Role** during registration on the frontend. 

1. Launch both the backend and frontend.
2. Go to the **Register** page.
3. Use the glowing dropdown to select **System Administrator (Admin)**.
4. Once registered and redirected to the Dashboard, you will see a newly unlocked **Admin: User Roster** panel that fetches data from the protected `/api/v1/admin/users` endpoint!
5. Log out, register a standard "User" account, and observe that the admin layout vanishes.

---

## 📈 Scalability Note

Scaling strategies (including Load Balancing, Docker containerization, and Redis caching) have been detailed in the dedicated [scalability.md](./scalability.md) file included in the root of this repository.

---

*Thank you for reviewing my submission. I look forward to the opportunity to contribute to Primetrade.*
