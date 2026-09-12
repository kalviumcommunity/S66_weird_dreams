# Troubleshooting Guide - Weird Dreams

## Common Issues & Solutions

### Authentication Issues

#### ❌ "Unauthorized: No token provided"
**Cause:** User is not logged in or token has expired

**Solution:**
1. Clear browser localStorage: `localStorage.clear()` in console
2. Go to /login and log in again
3. Verify .env has valid SECRET_KEY

#### ❌ "Invalid token" or "Token verification failed"
**Cause:** Token is corrupted or SECRET_KEY changed

**Solution:**
1. Clear localStorage
2. Log in again
3. If in production, ensure Render has correct SECRET_KEY env var

#### ❌ Token stays valid after logout
**Cause:** Token stored but user not cleared from state

**Solution:**
1. Ensure logout() clears both token and localStorage
2. Refresh page after logout
3. Check that AuthContext logout is called

#### ❌ Can't sign up - "Email already registered"
**Cause:** Email is already in database

**Solution:**
1. Use a different email
2. Or delete the existing user from MongoDB Atlas UI
3. Try with a unique email

---

### API Connection Issues

#### ❌ "Cannot GET /dream/my-dreams"
**Cause:** Backend endpoint not found or server not running

**Solution:**
1. Check backend is running: `npm start` in backend folder
2. Verify server logs show "MongoDB Connected"
3. Check API_BASE_URL in frontend is correct

#### ❌ "Failed to fetch" or CORS error
**Cause:** Backend CORS not configured or wrong URL

**Solution:**
1. Check FRONTEND_URL in backend .env matches frontend URL
2. Restart backend server
3. In browser console, check exact error message
4. Verify backend listens on port 8080

#### ❌ "Error: getaddrinfo ENOTFOUND localhost:8080"
**Cause:** Backend server not running

**Solution:**
1. Start backend: `cd backend && npm start`
2. Wait for "Server is running on http://localhost:8080"
3. Check for error messages in terminal

---

### MongoDB Connection Issues

#### ❌ "Error: MONGODB_URI not set"
**Cause:** Missing .env file or MONGODB_URI not configured

**Solution:**
1. Create .env: `cp .env.example .env`
2. Add MONGODB_URI: `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/weird-dreams`
3. Restart server: `npm start`

#### ❌ "MongoNetworkError: connect ECONNREFUSED"
**Cause:** MongoDB connection string is invalid or database is offline

**Solution:**
1. Verify connection string in .env (Atlas URL format)
2. Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0 for development)
3. Ensure MongoDB cluster is running (check Atlas dashboard)
4. Try connection string in MongoDB Compass to test

#### ❌ "EAUTH Authentication failed"
**Cause:** MongoDB username/password is incorrect

**Solution:**
1. Verify username and password in connection string
2. Check special characters are URL-encoded (e.g., @ becomes %40)
3. Test credentials in MongoDB Atlas UI
4. Regenerate password if needed

#### ❌ "Topology was destroyed"
**Cause:** Database connection dropped

**Solution:**
1. Restart backend server
2. Check network connection
3. Verify MongoDB cluster is active
4. Check MongoDB Atlas resource limits

---

### Dream Operations Issues

#### ❌ "Dream entry not found" on update/delete
**Cause:** Dream ID is invalid or doesn't exist

**Solution:**
1. Verify dream ID is correct (24-char hex string)
2. Fetch dreams list first to get valid IDs
3. Check dream belongs to logged-in user
4. Try fetching the dream with GET first

#### ❌ "You can only update your own dreams"
**Cause:** Trying to edit someone else's dream

**Solution:**
1. This is expected behavior (security feature)
2. Only edit dreams you created
3. Check userId in dream matches current user

#### ❌ "Please select at least one emotion"
**Cause:** Dream submission missing emotion field

**Solution:**
1. Select at least one emotion from dropdown
2. Verify emotions are added before submit
3. Check that form validation isn't broken

#### ❌ Dream not appearing after creation
**Cause:** Dream saved but not refreshed in UI

**Solution:**
1. Refresh page manually
2. Check browser console for errors
3. Verify dream was saved in MongoDB (check Atlas)
4. Try creating again with different title

---

### Frontend Issues

#### ❌ Blank white screen
**Cause:** React not loading or error in App

**Solution:**
1. Check browser console for JavaScript errors
2. Verify frontend server is running: `npm run dev`
3. Try hard refresh: Ctrl+Shift+R or Cmd+Shift+R
4. Check that node_modules is installed: `npm install`

#### ❌ "Cannot find module 'axios'"
**Cause:** Dependencies not installed

**Solution:**
```bash
cd client
npm install
npm run dev
```

#### ❌ Navbar not showing login/signup buttons
**Cause:** AuthContext not loading properly

**Solution:**
1. Check App.jsx has AuthProvider wrapper
2. Verify AuthContext.jsx is created
3. Check browser console for errors
4. Clear localStorage and reload

#### ❌ Infinite loading state
**Cause:** API call is hanging or not responding

**Solution:**
1. Check backend is running
2. Check network tab in DevTools for hanging requests
3. Verify API_BASE_URL is correct
4. Restart both frontend and backend

---

### Gemini AI Analysis Issues

#### ❌ "Error analyzing dream"
**Cause:** Gemini API key is invalid or API not enabled

**Solution:**
1. Verify GEMINI_API_KEY in .env
2. Enable Google Generative AI API in Google Cloud
3. Check API key has proper permissions
4. Restart backend server

#### ❌ "No response received"
**Cause:** API timeout or rate limiting

**Solution:**
1. Wait and try again
2. Check Google Cloud console for quota issues
3. Verify internet connection
4. Check Gemini API status

---

### Deployment Issues

#### ❌ 502 Bad Gateway on Render
**Cause:** Backend crashed or environment variables missing

**Solution:**
1. Check Render logs for error messages
2. Verify all environment variables are set:
   - MONGODB_URI
   - SECRET_KEY
   - GEMINI_API_KEY
   - NODE_ENV=production
3. Restart deployment

#### ❌ Cloudflare deployment shows old version
**Cause:** Build cache or old deployment not deleted

**Solution:**
1. Run `npm run build` locally to verify build
2. Force redeploy in Cloudflare dashboard
3. Clear browser cache
4. Wait 5 minutes for CDN to update

#### ❌ Frontend can't reach backend in production
**Cause:** API_BASE_URL points to localhost

**Solution:**
1. Update API_BASE_URL to Render backend URL
2. Rebuild frontend: `npm run build`
3. Redeploy to Cloudflare
4. Verify URL doesn't have trailing slash

---

### Performance Issues

#### ❌ App is slow loading dreams
**Cause:** Database query is slow or returning too much data

**Solution:**
1. Add pagination to dreams fetch
2. Limit returned fields in Mongoose queries
3. Add database indexes on userId field
4. Check MongoDB connection is stable

#### ❌ Form submission is slow
**Cause:** Network latency or backend processing

**Solution:**
1. Check backend logs for slow operations
2. Verify network speed
3. Add request timeout handling
4. Show loading indicator

---

## Debug Checklist

When something is broken, go through this checklist:

- [ ] Is backend running? (`npm start` in backend folder)
- [ ] Is frontend running? (`npm run dev` in client folder)
- [ ] Are both on correct ports? (Backend: 8080, Frontend: 5173)
- [ ] Is .env file in backend folder with valid values?
- [ ] Is MongoDB connection working? (Check Atlas dashboard)
- [ ] Is Gemini API key valid? (Check Google Cloud console)
- [ ] Have dependencies been installed? (`npm install`)
- [ ] Is token valid? (Check localStorage in DevTools)
- [ ] Check browser console for JavaScript errors
- [ ] Check terminal for server errors
- [ ] Try clearing localStorage and logging in again
- [ ] Try hard refresh of browser (Ctrl+Shift+R)

---

## Getting Help

1. **Check the logs**
   - Frontend: Browser DevTools Console (F12)
   - Backend: Terminal running npm start

2. **Verify configuration**
   - Run `.env.example` check
   - Test MongoDB connection with Compass
   - Test API with curl or Bruno

3. **Common fixes**
   - Clear localStorage: `localStorage.clear()`
   - Restart servers: Stop and run `npm start` again
   - Reinstall deps: `rm -rf node_modules && npm install`
   - Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

4. **Check documentation**
   - SETUP_GUIDE.md - Full setup instructions
   - IMPLEMENTATION_SUMMARY.md - Overview of changes
   - API endpoint comments in router files

---

## Still Stuck?

If you've tried everything:

1. Note the exact error message (copy full text)
2. Check what you were doing when error occurred
3. Verify you followed SETUP_GUIDE.md exactly
4. Try with fresh database (create new MongoDB user)
5. Test with cURL or Bruno API client (not just web UI)

Remember: Most issues are related to:
- Missing/invalid environment variables
- Backend not running
- Expired JWT token
- MongoDB connectivity

Start with these and work down the list!
