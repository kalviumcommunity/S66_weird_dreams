# MongoDB Setup Instructions

## Option 1: MongoDB Atlas (Recommended - Cloud Database)

1. **Go to MongoDB Atlas**
   - Visit https://www.mongodb.com/cloud/atlas
   - Sign up for free account

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Choose "M0 Free Tier"
   - Select your region and create

3. **Set Database Credentials**
   - Create database user (username/password)
   - Note the credentials

4. **Get Connection String**
   - Click "Databases" → Your cluster
   - Click "Connect"
   - Select "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

5. **Update .env**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weird-dreams
   ```

6. **Whitelist IP Address**
   - In Atlas dashboard → Network Access
   - Add IP Address → 0.0.0.0/0 (for development)

---

## Option 2: Local MongoDB

### macOS (with Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Windows
- Download from https://www.mongodb.com/try/download/community
- Install and MongoDB will run automatically

### Linux
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

After installing locally, your .env should have:
```
MONGODB_URI=mongodb://localhost:27017/weird-dreams
```

---

## Test MongoDB Connection

Once MongoDB is running, restart the backend:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
Server is running on http://localhost:8080
```

---

## Using MongoDB Compass (GUI Tool)

**Download:** https://www.mongodb.com/products/compass

- Open Compass
- Enter connection string
- Browse databases and collections
- Useful for testing and debugging

---

## Next Steps

1. Choose Option 1 (Atlas) or Option 2 (Local)
2. Update .env with correct MONGODB_URI
3. Restart backend: Press `rs` in terminal if running, or `npm start` if stopped
4. Watch for "✅ MongoDB Connected" message
5. Backend will then run on http://localhost:8080
