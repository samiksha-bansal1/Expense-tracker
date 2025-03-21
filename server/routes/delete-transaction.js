const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const transactionId = req.params.id;
    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
});
module.exports = router;
