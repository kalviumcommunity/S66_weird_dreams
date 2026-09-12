# Weird Dreams - Full Stack Implementation Guide

## Project Overview
A full-stack MERN application for dream logging with AI-powered interpretations using Gemini API, deployed on Render (backend) and Cloudflare (frontend).

---

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

## 🌐 Deployment Guide

### Deploy Backend to Render

1. **Push code to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Create new Web Service on Render**
- Connect GitHub repository
- Build command: `npm install`
- Start command: `npm start`

3. **Set Environment Variables on Render**
```
MONGODB_URI=your_mongodb_atlas_uri
SECRET_KEY=your_secret_key
GEMINI_API_KEY=your_gemini_key
NODE_ENV=production
FRONTEND_URL=your_frontend_url
```

4. **Update Frontend API URL**
In `client/src/context/AuthContext.jsx`:
```javascript
const API_BASE_URL = 'https://your-render-backend.onrender.com';
```

### Deploy Frontend to Cloudflare Pages

1. **Build the frontend**
```bash
cd client
npm run build
```

2. **Connect to Cloudflare Pages**
- Connect GitHub repository
- Build command: `npm run build`
- Build output directory: `dist`

3. **Set Environment Variables**
```
VITE_API_BASE_URL=https://your-render-backend.onrender.com
```

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

## 🐛 Troubleshooting

### JWT Token Expired
- Clear localStorage
- Login again to get new token

### MongoDB Connection Failed
- Verify MONGODB_URI in .env
- Check MongoDB Atlas IP whitelist
- Ensure cluster is active

### CORS Error
- Update FRONTEND_URL in backend .env
- Restart server

### Dream Not Saving
- Check user is authenticated (token in localStorage)
- Verify dream has title, description, and emotion
- Check browser console for error messages

---

## 📊 Key Features Checklist

- [x] User authentication (signup/login)
- [x] Password hashing
- [x] JWT token generation
- [x] Data ownership enforcement
- [x] Protected routes
- [x] Dream CRUD operations
- [x] Emotion tagging
- [x] Dream type classification
- [x] Dream analysis with Gemini AI
- [x] Responsive UI with Tailwind CSS
- [x] Error handling
- [x] Input validation
- [x] User profile management

---

## 🚀 Next Phase Features (Optional)

- [ ] Dream sharing with other users
- [ ] Public/private dream settings
- [ ] Dream search and filtering
- [ ] Dream export (PDF/JSON)
- [ ] Social features (comments, likes)
- [ ] Dream statistics and patterns
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] OAuth integration (Google, GitHub)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review error messages in browser console
3. Check server logs on terminal
4. Verify .env configuration

---

## 📝 License

This project is open source and available under the ISC License.
