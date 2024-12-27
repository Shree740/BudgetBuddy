const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    // Get the token from the header
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }
    
    // Verify the token
    const decoded = await jwt.verify(token, "masynctechKey");

    // Save the decoded user info to request object
    req.user = decoded.id;
    
    next();
  } catch (err) {
    // Token verification failed, either invalid or expired
    const error = new Error("Token expired or invalid, login again");
    error.statusCode = 401; // Unauthorized status
    next(error);
  }
};

module.exports = isAuthenticated;
