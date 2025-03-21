const express = require("express");
const {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  deleteAllTransactions,
  deleteTransaction,
} = require("../controllers/transaction");

const router = express.Router();

router.post("/add-transaction", createNewTransaction);
router.get("/get-all-transactions", getAllTransactions);
router.put("/update-transaction/:id", updateTransaction);
router.delete("/delete-all-transactions", deleteAllTransactions);
router.delete("/delete-transaction/:id", deleteTransaction);

module.exports = router;
