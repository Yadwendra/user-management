# Backend - User Management API

## Setup
1. Copy `.env.example` to `.env` and fill values (MONGO_URI, OPENAI_API_KEY).
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Run:
   ```
   npm run dev
   ```
4. API endpoints:
   - POST /api/users
   - GET /api/users?q=search&role=roleName
   - PUT /api/users/:id
   - DELETE /api/users/:id
