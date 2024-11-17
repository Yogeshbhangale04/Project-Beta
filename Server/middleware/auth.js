// middleware/auth.js
const jwt = require("jsonwebtoken");

// Middleware to authenticate the token
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Store the user data from the token
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware to authorize based on roles
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied, insufficient role" });
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRole };
