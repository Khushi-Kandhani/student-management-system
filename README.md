📚 Student Management System
Student Management System is a full-stack web application built with React and Express.js, featuring JWT authentication, protected routes, REST API design, and Docker containerization.
This project demonstrates real world backend architecture, container orchestration, and full stack integration.

🚀 Project Overview
This application allows users to register/login and manage student records through a secure REST API. The backend follows an MVC architecture with middleware, authentication, and standardized API responses. The project is containerized using Docker and Docker Compose with a PostgreSQL service.

✨ Features
🔐 JWT Authentication (Login / Register)
🔒 Protected Routes with Middleware
👨‍🎓 Student CRUD Operations (Create, Read, Update, Delete)
📡 RESTful API Design
🧾 Standardized API Response Model (TypeScript Interface)
🗄️ PostgreSQL Ready (Sequelize ORM structure)
🐳 Docker & Docker Compose Containerization
⚙️ Environment Variables using dotenv
🧱 MVC Backend Architecture
⚠️ Error Handling Middleware
🔁 Full-Stack Integration (React + Express)

🛠️ Tech Stack
* Frontend
* React
* JSX
* CSS
Backend
* Node.js
* Express.js
* JWT Authentication
* Middleware
* REST API
* dotenv
Database
* PostgreSQL
* Sequelize ORM
DevOps / Tools
* Docker
* Docker Compose
* Containerized Services
* Environment Configuration
  
📦 Backend Architecture
The backend follows a structured architecture:
backend/
│
├── controllers/      # Business logic
├── models/           # Database models
├── routes/           # API routes
├── middleware/       # Auth & error middleware
├── configs/          # Configuration files
├── db/               # Database setup / migrations
└── server.js         # Express server

Architecture Pattern Used:

* MVC Pattern
* Middleware Architecture
* REST API Structure
* Authentication Layer
* Error Handling Layer

🐳 Docker Setup
The project uses Docker Compose to run multiple services:

Services
* PostgreSQL Database Container
* Node.js Backend Container

 🔐 Authentication Flow
1. User registers or logs in
2. Server generates JWT token
3. Token is returned to client
4. Client sends token in Authorization header
5. Middleware verifies token for protected routes

👩‍💻 Author
Computer Science Student | Full Stack Developer | DevOps Enthusiast
