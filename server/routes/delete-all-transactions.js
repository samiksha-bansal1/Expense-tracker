const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();

router.delete("/", async (req, res) => {
  try {
    const result = await Transaction.deleteMany({});
    res.status(200).json({
      message: "All transactions deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all transactions:", error);
    res.status(500).json({ message: "Failed to delete transactions" });
  }
});
module.exports = router;
