const express = require("express");
const { getAllTransactions } = require("../controllers/get-all-transactions");

const router = express.Router();

router.get("/", getAllTransactions);

module.exports = router;
