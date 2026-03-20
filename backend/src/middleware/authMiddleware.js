const jwt = require('jsonwebtoken');

// Auth Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.',
      });
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_secret_key'
    );

    // Attach user info to request object
    req.user = decoded;

    // Move to next middleware/route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      error: error.message,
    });
  }
};

module.exports = authMiddleware;
