const express = require("express");
const { createNewTransaction } = require("../controllers/add-transaction");

const router = express.Router();

router.post("/", createNewTransaction);

module.exports = router;
