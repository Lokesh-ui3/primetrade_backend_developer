# Scalability Note

This document outlines how the current monolithic architecture can be scaled as the user base and data volume grow.

## 1. Load Balancing & Horizontal Scaling
Currently, the Node.js application runs on a single thread. To scale out:
*   **PM2 or Node Cluster:** We can utilize all CPU cores on a single machine by using `pm2` clustering.
*   **Horizontal Scaling:** Deploy multiple instances of the backend application across different servers. We can place an **Nginx** or **AWS Application Load Balancer (ALB)** in front to distribute incoming API requests evenly across all instances using Round Robin.

## 2. Docker & Containerization
Containerizing the application ensures consistency across development, staging, and production.
*   We can create a `Dockerfile` for the backend and a multi-stage `Dockerfile` for the frontend (using Nginx to serve the static built React files).
*   Using **Kubernetes (K8s)** or **AWS ECS**, we can automatically scale the number of Docker containers up or down based on CPU usage or traffic spikes, ensuring we only use the compute power we need.

## 3. Caching Strategy
To reduce the load on the MongoDB database and speed up response times:
*   **Redis:** We can integrate Redis to cache frequently accessed data, such as the User profiles or lists of Tasks that don't change often. When a user requests their tasks, we check Redis first; if it's a miss, we query MongoDB and save the result in Redis.
*   **Invalidation:** On `POST`, `PUT`, or `DELETE` requests to `/api/v1/tasks`, we invalidate the specific user's task cache.

## 4. Database Scaling
*   **Indexing:** Ensure that fields frequently filtered or sorted on (like `email`, `user` ID in the Tasks collection, and `status`) are properly indexed in MongoDB.
*   **Read Replicas & Sharding:** As read-heavy operations increase, we can add MongoDB Read Replicas. If data grows extremely large, we can shard the MongoDB clusters across multiple physical servers.

## 5. Microservices
If the application expands to include completely disparate domains (e.g., Notifications, Payments, complex Analytics), we can split the monolith into Microservices. For example, an Auth Service handles JWT generation, and a separate Task Service handles CRUD APIs. They would communicate asynchronously via a message broker like **RabbitMQ** or **Apache Kafka**.
