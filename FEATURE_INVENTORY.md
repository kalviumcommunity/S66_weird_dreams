# Weird Dreams — Feature Inventory (Task 3: accurate Built vs Future list)

One-page table of every notable feature against its **true current status**.
Verified against the code in this repo: `backend/routes/*`, `backend/model/*`,
`backend/middleware/authenticate.js`, and `client/src/*`.

| # | Feature | Status | Proof (where it lives) |
|---|---------|--------|------------------------|
| 1 | Signup with validation + **bcrypt-hashed** passwords + JWT issued | ✅ Built | `POST /auth/signup` in `backend/routes/authRouter.js` (+ legacy `signupRouter.js`); `client/src/pages/Signup.jsx` |
| 2 | Login (email + password verify with `bcrypt.compare`) + JWT issued | ✅ Built | `POST /auth/login` in `backend/routes/authRouter.js` (+ legacy `loginRouter.js`); `client/src/pages/Login.jsx` |
| 3 | `authenticate` middleware (Bearer/cookie JWT verify → `req.user`) **wired into protected routes** | ✅ Built | `backend/middleware/authenticate.js`; used on dream create/my-dreams/get/get/:userId/get-dream/update/delete, `GET /auth/me`, `POST /ai/analyze-dream`, user update/delete |
| 4 | Private dream journal — create uses **logged-in user's ID** (no hardcoded ID); `GET /dream/my-dreams` returns only your dreams | ✅ Built | `POST /dream/create`, `GET /dream/my-dreams` in `backend/routes/dreamRouter.js`; `client/src/pages/AddDream.jsx`, `Dreams.jsx` |
| 5 | Dream CRUD with **ownership checks** (read/update/delete someone else's dream → `403`) | ✅ Built | `GET /dream/get-dream/:dreamId`, `PUT /dream/update-dream/:dreamId`, `DELETE /dream/delete/:dreamId`, `GET /dream/get/:userId` in `dreamRouter.js` |
| 6 | Dream fields: title, description, date, **emotions**, **lucid / nightmare / recurring**, tags | ✅ Built | `backend/model/dream.model.js`, `backend/validation/dreamvalidation.js`; `AddDreamForm.jsx`, `EditDreamForm.jsx`, `DreamCard.jsx` |
| 7 | **AI dream interpretation** (Gemini `gemini-1.5-flash`): short summary + detailed meaning | ✅ Built | `POST /ai/analyze-dream` in `backend/routes/analyzeRouter.js` (needs `GEMINI_API_KEY` + login); "Analyze with AI" in `DreamCard.jsx` → `ModalContent.jsx` |
| 8 | Emotion summaries on each entry (stored emotions shown per dream) | ✅ Built | `emotions` array in schema + display in `DreamCard.jsx` |
| 9 | Protected frontend routes + session persistence (token in `localStorage`, auto-validate) | ✅ Built | `client/src/components/ProtectedRoute.jsx`, `client/src/context/AuthContext.jsx`, `client/src/App.jsx` |
| 10 | User list + per-user dream pages | ✅ Built (private) | `GET /api/users` in `userRouter.js` (passwords excluded via `.select('-password')`); `CreatedBy.jsx`, `UserDreams.jsx` (requires login, own dreams only) |
| 11 | Passwords excluded from **all** user responses | ✅ Built | `.select('-password')` in `userRouter.js` (`GET /users`, `GET /users/:id`, `PUT /users/:id`) and `GET /auth/me` |
| 12 | Responsive Tailwind UI (desktop + mobile) | ✅ Built | `client/src/*` + Tailwind; `LandingPage.jsx` |
| 13 | Deployment configs (Render backend, Cloudflare Pages frontend) + Bruno API collection | ✅ Built | `backend/render.yaml`, `backend/.env.example`, `client/.env.example`, `backend/docs.bruno/ASAP/*` |
| 14 | Dream **sharing / public links** | 🔮 Future idea | Not implemented — all dream reads require login + ownership |
| 15 | Social features (likes, comments, public explore feed) | 🔮 Future idea | Not implemented |
| 16 | Advanced analytics (emotion trends/charts, recurring-theme insights) | 🔮 Future idea | Not implemented (raw emotion tags only) |
| 17 | Reminders / notifications / streaks | 🔮 Future idea | Not implemented |
| 18 | Password reset / email verification / OAuth | 🔮 Future idea | Not implemented |

**Corrections to the earlier record (for Q9, Task 5):**
- AI dream analysis **IS already implemented** (not a future idea): working `POST /ai/analyze-dream` Gemini endpoint exists and is wired into the frontend's "Analyze with AI" button. Provable by: `backend/routes/analyzeRouter.js` + `DreamCard.jsx` + Bruno request `Dreams - AI Analyze.bru`.
- Emotions / lucid / nightmare / recurring are **already in the schema and UI**, not future ideas.
- One checkable number for the viva: **`6 dream routes are protected by the `authenticate` middleware** (`POST /create`, `GET /my-dreams`, `GET /get`, `GET /get/:userId`, `GET /get-dream/:dreamId`, `PUT /update-dream/:dreamId`, `DELETE /delete/:dreamId` — that's 7 including both GET-by-user variants; core CRUD ownership checks = read/update/delete all return `403` cross-user).
