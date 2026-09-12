# Weird Dreams 🌙 — Dream Logging + AI Interpretation

Full-stack MERN app to securely record dreams and get AI-generated interpretations + emotion summaries.

**Stack:** React (Vite) + Tailwind, Node.js + Express, MongoDB (Mongoose), Gemini API, Cloudflare (frontend) + Render (backend), Bruno (API testing).

## Features (all functional)
- 🔐 Signup / Login with JWT (bcrypt-hashed passwords), protected routes, session persistence
- 📝 Dream CRUD (private per user): title, description, date, emotions, lucid/nightmare/recurring, tags
- 🤖 AI dream analysis via Gemini (`POST /ai/analyze-dream`) with summary + interpretation
- 👥 Browse dreamers + public dream feed
- 📱 Responsive Tailwind UI (desktop + mobile)

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm
- MongoDB (local or Atlas)
- Gemini API key (from Google Cloud)
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** (copy from `.env.example`)
```bash
cp .env.example .env
```

4. **Configure environment variables in `.env`**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weird-dreams
SECRET_KEY=your-super-secret-key-here-min-32-chars
GEMINI_API_KEY=your-gemini-api-key
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. **Start the backend server**
```bash
npm start
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 📋 API Endpoints Reference

### Authentication Routes
```
POST   /auth/signup          - Register new user
POST   /auth/login           - Login user
GET    /auth/me              - Get current authenticated user
```

### Dream Routes (All require authentication)
```
POST   /dream/create         - Create new dream (authenticated)
GET    /dream/my-dreams      - Get user's dreams (authenticated)
GET    /dream/get            - Get all dreams (public)
GET    /dream/get/:userId    - Get dreams by user ID
GET    /dream/get-dream/:id  - Get single dream
PUT    /dream/update/:id     - Update dream (owner only)
DELETE /dream/delete/:id     - Delete dream (owner only)
```

### User Routes
```
GET    /api/users            - Get all users
POST   /api/create           - Create user (legacy endpoint)
GET    /api/users/:id        - Get user by ID
PUT    /api/users/:id        - Update user profile (authenticated)
DELETE /api/users/:id        - Delete user account (authenticated)
```

### AI Analysis Routes (Requires authentication)
```
POST   /ai/analyze-dream     - Analyze dream with Gemini AI
```

---

## 🔐 Authentication Flow

### Signup
```javascript
POST /auth/signup
{
  "username": "dreamlover",
  "email": "user@example.com",
  "password": "secure_password"
}
// Returns: { token, user: { id, username, email } }
```

### Login
```javascript
POST /auth/login
{
  "email": "user@example.com",
  "password": "secure_password"
}
// Returns: { token, user: { id, username, email } }
```

### Using Token
All authenticated endpoints require this header:
```
Authorization: Bearer <token>
```

The frontend automatically handles this via axios interceptor in `AuthContext`.

---

## 📁 Project Structure

### Backend
```
backend/
├── routes/
│   ├── authRouter.js           # Auth endpoints (signup, login, me)
│   ├── dreamRouter.js          # Dream CRUD operations
│   ├── userRouter.js           # User management
│   ├── analyzeRouter.js        # AI dream analysis
│   └── signupRouter.js         # Legacy signup
├── model/
│   ├── user.model.js           # User schema
│   └── dream.model.js          # Dream schema
├── middleware/
│   └── authenticate.js         # JWT verification
├── validation/
│   ├── uservalidation.js       # User input validation
│   └── dreamvalidation.js      # Dream input validation
├── database.js                 # MongoDB connection
├── server.js                   # Express app setup
├── package.json
└── .env.example
```

### Frontend
```
client/src/
├── context/
│   └── AuthContext.jsx         # Auth state management
├── components/
│   ├── Navbar.jsx              # Navigation with user menu
│   ├── ProtectedRoute.jsx      # Route protection wrapper
│   ├── AddDreamForm.jsx        # Dream creation form
│   ├── DreamCard.jsx           # Dream display card
│   ├── EditDreamForm.jsx       # Dream editing form
│   └── Features.jsx            # Landing page features
├── pages/
│   ├── Login.jsx               # Login page
│   ├── Signup.jsx              # Registration page
│   ├── LandingPage.jsx         # Home page
│   ├── AddDream.jsx            # Add/view dreams
│   ├── EditDream.jsx           # Edit dream page
│   ├── Dreams.jsx              # All dreams feed
│   ├── UserDreams.jsx          # User dreams view
│   └── CreatedBy.jsx           # Users list
├── App.jsx                     # Main app with routes
├── main.jsx                    # React entry point
└── index.css
```

---

## 🔒 Security Features Implemented

✅ **Password Hashing**
- Using bcryptjs with 10 salt rounds
- Passwords never stored in plain text

✅ **JWT Authentication**
- 7-day token expiration
- Secure token storage in localStorage
- Bearer token in Authorization header

✅ **Data Ownership**
- Users can only access/modify their own dreams
- Ownership validation on update/delete endpoints
- 403 Forbidden response for unauthorized access

✅ **Input Validation**
- Server-side Joi schema validation
- Email format validation
- Password minimum length enforcement

✅ **Error Handling**
- Comprehensive error messages
- Proper HTTP status codes
- Token expiration handling

---

## 🧪 Testing the API with Bruno

Import the Bruno collection from `backend/docs.bruno/` and test:

1. **Auth Flow**
   - Create account via `/auth/signup`
   - Login via `/auth/login`
   - Copy token to Authorization header

2. **Dream Operations**
   - Create dream
   - Fetch user's dreams
   - Update own dream
   - Try updating another user's dream (should fail)

---

