const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const userRouter = require('./routes/userRouter');
const dreamRouter = require('./routes/dreamRouter');
const analyzeRouter = require('./routes/analyzeRouter');
const authRouter = require('./routes/authRouter');
const { connection } = require('./database');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin / curl / mobile apps with no origin
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(null, true); // permissive for college demo; tighten in production
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(express.static('static'));

// Auth routes (no authentication required for signup/login)
app.use('/auth', authRouter);

// API routes
app.use('/api', userRouter);
app.use('/dream', dreamRouter);
app.use('/ai', analyzeRouter);

app.get('/ping', (req, res) => {
  res.json({ message: 'pong', status: 'ok', time: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Weird Dreams API is running 🌙',
    docs: {
      health: 'GET /ping',
      signup: 'POST /auth/signup {username, email, password}',
      login: 'POST /auth/login {email, password}',
      me: 'GET /auth/me (Bearer token)',
      myDreams: 'GET /dream/my-dreams (Bearer token)',
      createDream: 'POST /dream/create (Bearer token)',
      singleDream: 'GET /dream/get-dream/:dreamId',
      updateDream: 'PUT /dream/update-dream/:dreamId (Bearer token)',
      deleteDream: 'DELETE /dream/delete/:dreamId (Bearer token)',
      analyze: 'POST /ai/analyze-dream {dream} (Bearer token)',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.originalUrl });
});

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message,
  });
});

if (require.main === module) {
  app.listen(PORT, async () => {
    try {
      await connection;
      console.log('✅ MongoDB Connected');
    } catch (error) {
      console.log('⚠️ Server started but MongoDB connection failed:', error.message);
    }
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
