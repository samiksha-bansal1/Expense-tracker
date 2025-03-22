const jwt = require("jsonwebtoken");

const secret = "12345";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  return token;
}

function validateToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new Error("Token Expired. Please log in again.");
    }
    throw new Error("Invalid Token");
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
