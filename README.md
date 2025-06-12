# nestjs-auth-demo

A NestJS project demonstrating user authentication with:

- User registration (email/username + password + confirmation)  
- JWT token issuance and validation  
- User login with JWT token response  
- PostgreSQL database via TypeORM  
- End-to-end tests for auth flows  

---

## Setup

1. Clone the repo:

```bash
git clone <your-repo-url>
cd nestjs-auth-demo

npm install


DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
JWT_SECRET=your_jwt_secret

npm run start:dev

npm run test

npm run test:e2e

netstat -ano | findstr :3000

taskkill /PID <PID> /F

npm run typeorm migration:run

npm run start:dev

http://localhost:3000/docs

API Endpoints
POST /auth/register - Register a new user

POST /auth/login - Login user and receive JWT token

GET /auth/profile - Get user profile (protected route, requires JWT)


Author: Hyunmin Park

---




#깃헙배포
# Initialize Git repo if you haven't already
git init

# Add all files to staging
git add .

# Commit your changes with a message
git commit -m "Initial commit with auth project and README"

# Add your GitHub repo as remote (replace URL with your repo URL)
git remote add origin https://github.com/your-username/your-repo.git

# Push to main branch (or master if you use that)
git branch -M main
git push -u origin main

