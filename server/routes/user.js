const express = require("express");
const {
  handleSignin,
  handleLogin,
  handleLogout,
  handleUserDetails,
} = require("../controllers/user");
const {
  checkForAuthenticationInCookie,
} = require("../middlewares/authentication");

const router = express.Router();
router.post("/signin", handleSignin);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.get("/details", checkForAuthenticationInCookie, handleUserDetails);
module.exports = router;
