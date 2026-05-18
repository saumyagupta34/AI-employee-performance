# AI-Based Employee Performance Analytics & Recommendation System

![Dashboard Screenshot](placeholder-for-dashboard-screenshot.png)

## Overview
The **AI-Based Employee Performance Analytics & Recommendation System** is a comprehensive, full-stack web application designed to help HR teams and administrators manage, analyze, and optimize employee performance. By integrating cutting-edge AI capabilities via OpenRouter, the system offers data-driven recommendations for promotions, highlights areas for improvement, and suggests targeted training programs.

## Key Features
- **User Authentication**: Secure JWT-based registration and login system with password hashing (bcrypt).
- **Employee Management**: Full CRUD capabilities to manage employee profiles, including skills, department, experience, and performance scores.
- **Advanced Search & Filter**: Real-time search by name or skill and advanced filtering by department and performance score.
- **Interactive Dashboard**: Visual analytics utilizing Recharts (Bar and Pie charts) to provide high-level insights into department distribution and top performers.
- **AI Integration**: One-click AI analysis utilizing the OpenRouter API to instantly review an employee's profile and generate actionable HR insights.
- **Modern Responsive UI**: Crafted with Tailwind CSS, ensuring a polished, dynamic, and mobile-friendly user experience.

## Tech Stack
### Frontend
- **React.js** (via Vite)
- **React Router DOM** (Routing)
- **Tailwind CSS** (Styling)
- **Context API** (State Management)
- **Recharts** (Data Visualization)
- **Axios** (HTTP Requests)
- **React Icons** (UI Assets)

### Backend
- **Node.js & Express.js** (Server & API framework)
- **MongoDB & Mongoose** (Database & ODM)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt.js** (Password security)
- **Dotenv** (Environment variable management)
- **Cors** (Cross-origin resource sharing)

## AI Integration Explanation
This project integrates with OpenRouter to leverage advanced LLM capabilities (e.g., GPT-3.5-Turbo). When an administrator clicks "AI Review" on an employee, the backend constructs a contextual prompt based on the employee's specific metrics (skills, experience, performance score) and requests a structured JSON response. The frontend then dynamically renders the AI's tailored promotion recommendations, weak areas, and suggested training paths.

## Folder Structure
```text
root/
 ├── frontend/               # React frontend application
 │   ├── src/
 │   │   ├── api/            # Axios interceptor setup
 │   │   ├── components/     # Reusable UI components (Navbar, Sidebar, Modals)
 │   │   ├── context/        # React Context for Auth State
 │   │   ├── pages/          # Full page views (Dashboard, Employees, Login, etc.)
 │   │   └── index.css       # Tailwind entry point
 │   └── package.json
 ├── backend/                # Node.js Express backend API
 │   ├── config/             # Configuration files
 │   ├── controllers/        # Route logic and AI implementation
 │   ├── middleware/         # Custom JWT auth middleware
 │   ├── models/             # Mongoose schemas
 │   ├── routes/             # API route definitions
 │   ├── server.js           # Express server entry point
 │   └── package.json
 ├── package.json            # Root configuration for concurrent execution
 ├── .gitignore
 └── README.md
```

## Installation & Setup

### Prerequisites
- Node.js installed on your machine
- MongoDB running locally or a MongoDB Atlas connection string
- OpenRouter API Key

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd employee-performance
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee-analytics
JWT_SECRET=your_jwt_secret_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```
*(Note: A local MongoDB instance is used by default. Update `MONGO_URI` to use Atlas if preferred).*

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the frontend server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## API Endpoints Reference
**Auth:**
- `POST /api/auth/signup` - Register a new admin user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current authenticated user details

**Employees:**
- `GET /api/employees` - Retrieve all employees
- `POST /api/employees` - Add a new employee
- `GET /api/employees/search` - Search/Filter employees
- `PUT /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Remove employee

**AI Recommendations:**
- `POST /api/ai/recommend` - Generate AI performance review for a specific employee
