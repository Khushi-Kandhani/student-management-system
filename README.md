# 📚 Student Management System

A full-stack web application for managing student records with authentication, PostgreSQL database, and Docker containerization. Built with React, Express.js, and PostgreSQL.

## ✨ Features

- **User Authentication** - Secure login/registration with JWT tokens
- **Student Management** - Create, read, update, and delete student records
- **PostgreSQL Database** - Reliable relational database with Sequelize ORM
- **Docker Support** - Easy containerization with Docker and Docker Compose
- **Responsive UI** - Clean and intuitive user interface
- **Type Safety** - TypeScript for better code quality
- **API Integration** - RESTful API with standardized response format
- **Error Handling** - Comprehensive error handling and validation

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **JSX** - Component syntax
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JavaScript/TypeScript** - Programming languages

### Database
- **PostgreSQL** - Relational SQL database
- **Sequelize** - ORM for Node.js
- **Docker** - Containerization

## 📦 Project Structure

```
student_management/
├── api/
│   └── apiresponse.ts          # Standardized API response interface
├── backend/
│   └── src/
│       ├── app.jsx             # Main app component
│       ├── main.jsx            # Entry point
│       ├── server.js           # Express server setup
│       ├── components/         # React components
│       │   ├── AddStudentForm/
│       │   ├── Login/
│       │   ├── navbar/
│       │   ├── StudentCard/
│       │   └── studentList/
│       ├── pages/              # Page components
│       │   └── Home/
│       ├── controllers/        # Business logic
│       │   ├── authController.js
│       │   └── studentController.js
│       ├── models/             # Sequelize models
│       │   ├── student.js
│       │   └── index.js        # Database connection
│       ├── routes/             # API routes
│       │   ├── authRoute.js
│       │   └── studentRoutes.js
│       ├── middleware/         # Custom middleware
│       │   └── authMiddleware.js
│       ├── configs/            # Configuration files
│       └── db/
│           └── migrations/     # Database migrations
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Docker image configuration
├── .env.example               # Environment variables template
├── package.json               # Dependencies
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Docker** (for containerized PostgreSQL)
- **Docker Compose** (for orchestration)

### ⚡ Quick Start with Docker

This is the **easiest way** to get started!

#### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/student_management.git
cd student_management
```

#### **2. Create `.env` file**
Create a `.env` file in the project root:

```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=student_management
DB_USER=postgres
DB_PASSWORD=postgres_password_123

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Client
REACT_APP_API_URL=http://localhost:5000
```

#### **3. Start with Docker Compose**

```bash
docker-compose up --build
```

**What this does:**
- ✅ Pulls PostgreSQL image (already cached from your `docker pull postgres` command)
- ✅ Creates PostgreSQL container with database
- ✅ Installs Node.js dependencies
- ✅ Starts Express server on `http://localhost:5000`
- ✅ Starts React frontend on `http://localhost:3000`

#### **4. Access the Application**

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)
- **PostgreSQL:** localhost:5432

#### **5. Stop Docker Containers**

```bash
docker-compose down
```

---

## 🐳 Docker Setup Details

### **What's the Docker Compose doing?**

Your `docker-compose.yml` file orchestrates:

1. **PostgreSQL Service** - Runs in a container on port 5432
2. **Node.js Service** - Runs Express server in a container on port 5000
3. **Volume Mounting** - Persists database data even after container stops

### **Docker Compose Configuration**

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:14
    container_name: student_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres_password_123
      POSTGRES_DB: student_management
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Node.js Backend
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: student_backend
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: student_management
      DB_USER: postgres
      DB_PASSWORD: postgres_password_123
      PORT: 5000
      JWT_SECRET: your_super_secret_jwt_key
    ports:
      - "5000:5000"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules
    command: npm start

volumes:
  postgres_data:
```

### **Dockerfile Configuration**

Create `Dockerfile`:

```dockerfile
# Use Official Node.js Image
FROM node:18-alpine

# Set Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy Application Code
COPY . .

# Expose Port
EXPOSE 5000

# Start Server
CMD ["npm", "start"]
```

---

## 📋 Manual Setup (Without Docker)

If you prefer to run without Docker:

### **1. Install PostgreSQL Locally**

**Windows:**
- Download from [postgresql.org](https://www.postgresql.org/download/windows/)
- Follow installation wizard

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### **2. Create Database**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE student_management;

# Exit
\q
```

### **3. Install Dependencies**

```bash
npm install
```

### **4. Create `.env` file**

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=student_management
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
```

### **5. Start Server**

```bash
npm start
```

---

## 📖 API Documentation

### **API Response Format**

All responses use this standardized format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

### **Authentication Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

**Login Example:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "1",
      "email": "user@example.com"
    }
  }
}
```

### **Student Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/api/students` | Get all students | ✅ |
| GET | `/api/students/:id` | Get single student | ✅ |
| POST | `/api/students` | Create student | ✅ |
| PUT | `/api/students/:id` | Update student | ✅ |
| DELETE | `/api/students/:id` | Delete student | ✅ |

**Create Student Example:**
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "9876543210",
    "enrollmentDate": "2024-03-23T10:30:00Z"
  }
}
```

---

## 🔐 Authentication

The system uses **JWT (JSON Web Tokens)**:

1. User logs in with email and password
2. Server generates JWT token (valid for 24 hours)
3. Token stored in browser's localStorage
4. Subsequent requests include token in Authorization header
5. `authMiddleware` validates the token

**Token Format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Database Schema

### **Students Table**

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phoneNumber VARCHAR(20),
  enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🐳 Docker Commands Reference

### **Basic Commands**

```bash
# Start containers
docker-compose up

# Start in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f

# Rebuild containers (after code changes)
docker-compose up --build

# View running containers
docker-compose ps

# Access PostgreSQL container
docker-compose exec postgres psql -U postgres -d student_management

# Restart services
docker-compose restart
```

### **PostgreSQL Container Commands**

```bash
# Connect to PostgreSQL inside Docker
docker-compose exec postgres psql -U postgres -d student_management

# View all users
\du

# View all databases
\l

# View tables
\dt

# Exit PostgreSQL
\q
```

---

## 🛠️ Development Workflow

### **1. Start Development Servers**

```bash
# Using Docker (Recommended)
docker-compose up

# Or manually
npm install
npm start
```

### **2. Backend Development**

Edit files in `backend/src/` - server auto-reloads with Docker volumes

### **3. Frontend Development**

Edit files in `backend/src/components/` and `backend/src/pages/`

### **4. Database Migrations**

If you add new fields:

```bash
# Inside Docker container
docker-compose exec backend npx sequelize-cli migration:generate --name add_new_field

# Run migrations
docker-compose exec backend npx sequelize-cli db:migrate
```

---

## 🧪 Testing API

### **Using Postman or cURL**

1. **Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

2. **Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

3. **Copy the token from response and use it:**
```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Database Backup/Restore

### **Backup Database**

```bash
docker-compose exec postgres pg_dump -U postgres student_management > backup.sql
```

### **Restore Database**

```bash
docker-compose exec -T postgres psql -U postgres student_management < backup.sql
```

---

## 🚨 Troubleshooting

### **Problem: Port Already in Use**

```bash
# Change port in docker-compose.yml or .env
# Or kill process on port:
lsof -i :5432   # Find PostgreSQL
lsof -i :5000   # Find Node.js
kill -9 <PID>
```

### **Problem: Database Connection Error**

```bash
# Check if PostgreSQL container is running
docker-compose ps

# Check logs
docker-compose logs postgres

# Restart services
docker-compose restart
```

### **Problem: Module Not Found**

```bash
# Rebuild without cache
docker-compose up --build --remove-orphans
```

### **Problem: Database Locked**

```bash
# Restart PostgreSQL container
docker-compose restart postgres
```

---

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `DB_HOST` | postgres | Database host |
| `DB_PORT` | 5432 | Database port |
| `DB_NAME` | student_management | Database name |
| `DB_USER` | postgres | Database user |
| `DB_PASSWORD` | postgres_password_123 | Database password |
| `JWT_SECRET` | your_secret_key | JWT signing key |
| `NODE_ENV` | development | Environment |

---

## 🎯 Next Steps & Enhancements

- [ ] Add student search and filtering
- [ ] Implement pagination
- [ ] Add course management module
- [ ] Implement grades tracking
- [ ] Add file upload for student documents
- [ ] Create admin dashboard
- [ ] Add email notifications
- [ ] Implement role-based access control
- [ ] Add student attendance tracking
- [ ] Create analytics dashboard

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push branch: `git push origin feature/YourFeature`
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 📞 Support

For issues or questions:
- Create a GitHub Issue
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- PostgreSQL documentation
- Express.js community
- Sequelize ORM
- Docker documentation

---

**Ready to build? Start with:** `docker-compose up` 🚀
