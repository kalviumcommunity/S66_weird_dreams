const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
        
        if (!token || token === 'null' || token === 'undefined') {
            return res.status(401).json({ 
                message: "Unauthorized: No token provided",
                error: "Please log in to access this resource"
            });
        }

        if (!process.env.SECRET_KEY) {
            console.error('SECRET_KEY is not set');
            return res.status(500).json({
                message: "Server misconfigured",
                error: "Authentication secret is missing"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decoded) {
            return res.status(401).json({ 
                message: "Unauthorized: Invalid token",
                error: "Token verification failed"
            });
        }

        // Attach user info to request without modifying req.body
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            username: decoded.username
        };
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: "Unauthorized: Token expired",
                error: "Please log in again"
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: "Unauthorized: Invalid token",
                error: "Token verification failed"
            });
        }
        return res.status(401).json({ 
            message: "Unauthorized",
            error: error.message
        });
    }
};

module.exports = { authenticate };
