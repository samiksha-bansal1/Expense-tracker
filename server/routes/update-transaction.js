const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();
router.put("/:id", async (req, res) => {
  //   console.log(req.params.id);
  try {
    const transactionId = req.params.id;
    console.log(transactionId);
    const updatedData = req.body;
    console.log(updatedData);
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({
      message: "Transaction updated successfully!",
      updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
});
module.exports = router;
