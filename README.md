# Weird Dreams 🌙 — Dream Logging + AI Interpretation

Full-stack MERN app to securely record dreams and get AI-generated interpretations + emotion summaries.

**Stack:** React (Vite) + Tailwind, Node.js + Express, MongoDB (Mongoose), Gemini API, Cloudflare (frontend) + Render (backend), Bruno (API testing).

## Features (all functional)
- 🔐 Signup / Login with JWT (bcrypt-hashed passwords), protected routes, session persistence
- 📝 Dream CRUD (private per user): title, description, date, emotions, lucid/nightmare/recurring, tags
- 🤖 AI dream analysis via Gemini (`POST /ai/analyze-dream`) with summary + interpretation
- 👥 Browse dreamers + public dream feed
- 📱 Responsive Tailwind UI (desktop + mobile)

## Quick start (local)

### 1. Backend
```bash
cd backend
cp .env.example .env   # then fill MONGODB_URI, SECRET_KEY, GEMINI_API_KEY
npm install
npm run dev            # http://localhost:8080
```

### 2. Frontend
```bash
cd client
cp .env.example .env   # optional: VITE_API_URL=http://localhost:8080
npm install
npm run dev            # http://localhost:5173
```

### 3. Test the API (curl)
```bash
curl http://localhost:8080/ping

# signup
curl -X POST http://localhost:8080/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","email":"demo@test.com","password":"password123"}'

# login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@test.com","password":"password123"}'

# my dreams (replace TOKEN)
curl http://localhost:8080/dream/my-dreams -H "Authorization: Bearer TOKEN"

# create dream
curl -X POST http://localhost:8080/dream/create \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" \
  -d '{"title":"Flying over the city","description":"I was flying over a glowing city at night and felt free and calm","emotions":["happy","calm"],"lucid":true,"tags":["flying","city"]}'

# AI analysis
curl -X POST http://localhost:8080/ai/analyze-dream \
  -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" \
  -d '{"dream":"I was flying over a glowing city"}'
```

Bruno collection lives in `backend/docs.bruno/` — import it into Bruno and set base URL to `http://localhost:8080` (or your Render URL).

## API reference
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/ping` | — | Health check |
| POST | `/auth/signup` | — | Register (username, email, password) → token |
| POST | `/auth/login` | — | Login (email, password) → token |
| GET | `/auth/me` | ✅ | Current user |
| GET | `/dream/my-dreams` | ✅ | Private dream list |
| POST | `/dream/create` | ✅ | Create dream |
| GET | `/dream/get` | — | Public feed |
| GET | `/dream/get/:userId` | — | Dreams by user |
| GET | `/dream/get-dream/:dreamId` | — | Single dream |
| PUT | `/dream/update-dream/:dreamId` | ✅ (owner) | Update dream |
| DELETE | `/dream/delete/:dreamId` | ✅ (owner) | Delete dream |
| POST | `/ai/analyze-dream` | ✅ | Gemini interpretation `{dream}` → `{analysis}` |

## Deploy
- **Backend → Render:** root `backend/`, build `npm install`, start `npm start`, env: `MONGODB_URI`, `SECRET_KEY`, `GEMINI_API_KEY`, `FRONTEND_URL`, `NODE_ENV=production`. See `backend/render.yaml`.
- **Frontend → Cloudflare Pages:** root `client/`, build `npm run build`, output `dist`, env: `VITE_API_URL=https://<your-backend>.onrender.com`.
- MongoDB: use Atlas (free tier) and whitelist `0.0.0.0/0` for Render.

## Project structure
```
backend/  Express API (routes/, model/, middleware/, validation/)
client/   React app (pages/, components/, context/AuthContext.jsx, config.js)
```

