## PrimeTrade AI – Full Stack Assignment

*A scalable full-stack web application with authentication, protected dashboard, profile management, and task CRUD functionality.*

**🚀 Tech Stack**
   1. Frontend
      - React.js
      - Tailwind CSS
      - React Router

   2. Backend
      - Node.js
      - Express.js
      - MongoDB (Mongoose)
      - JWT Authentication
      - bcrypt password hashing


**✨ Features**
   - User Registration & Login
   - JWT-based Authentication
   - Protected Routes
   - User Profile Fetch & Update
   - Task CRUD Operations
   - Responsive UI
   - Secure password storage


**📁 Project Structure**

├── frontend
│ └── React application
├── backend
│ └── Express API



**🛠️ Setup Instructions**

   1. Backend Setup
      - cd backend
      - npm install
      - npm run dev

   2. Create .env file:
      - MONGO_URI=your_mongodb_uri
      - JWT_SECRET=your_jwt_secret
      - PORT=5000


   3. Frontend Setup
      - cd frontend
      - npm install
      - npm start


**📡 API Endpoints**

   1. Auth
      - POST /api/auth/register

      - POST /api/auth/login

      - GET /api/auth/me


   2. Profile
      - GET /api/user/profile

      - PUT /api/user/profile


   3. Tasks
      - GET /api/tasks

      - POST /api/tasks

      - PUT /api/tasks/:id

      - DELETE /api/tasks/:id


**🔐Security**
 - Password hashing using bcrypt

 - JWT token-based authentication

 - Protected backend routes using middleware


**📈Scalability** 
 - Modular backend architecture

 - Easy to extend APIs

 - Frontend-backend separation

 - Can be deployed using cloud services (Vercel, Render, AWS)


**Screenshots**



**👤Author**
   *- Sourabh (Frontend Developer Intern Candidate) (https://github.com/Sourabh108-Coder/)* 
