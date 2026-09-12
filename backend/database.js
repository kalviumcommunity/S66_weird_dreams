const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURL = process.env.MONGODB_URI || process.env.mongoURL;

if (!mongoURL) {
    console.error('⚠️ WARNING: MONGODB_URI environment variable is not set — API will run without DB until configured.');
}

// Don't crash the process on missing/invalid DB config (needed for Render health checks).
// Routes will return 500s with a clear message until the DB connects.
const connection = mongoURL
    ? mongoose.connect(mongoURL)
        .then(() => {
            console.log('✅ MongoDB Connected Successfully');
            return mongoose.connection;
        })
        .catch((err) => {
            console.error('❌ MongoDB Connection Error:', err.message);
            return null;
        })
    : Promise.resolve(null);

module.exports = { connection };