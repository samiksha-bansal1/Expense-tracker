const express = require("express");
const {
  handleSignin,
  handleLogin,
  handleLogout,
} = require("../controllers/user");

const router = express.Router();
router.post("/signin", handleSignin);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

module.exports = router;
