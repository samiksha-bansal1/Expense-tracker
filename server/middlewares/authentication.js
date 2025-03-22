const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey1"; // Use a strong secret key

const checkForAuthenticationInCookie = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user data to request object
    // console.log("Authenticated User:", decoded);
    next(); // Proceed to next middleware/route
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

module.exports = { checkForAuthenticationInCookie };
