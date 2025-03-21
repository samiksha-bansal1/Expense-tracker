const Transaction = require("../models/transaction");
const createNewTransaction = async (req, res) => {
  try {
    // console.log(req.body);
    const newTransaction = await Transaction.create(req.body);
    // console.log(newTransaction);
    res
      .status(201)
      .json({ message: "Transaction added", transaction: newTransaction });
  } catch (err) {
    // console.log("Invalid input data");
    res.status(400).json({ error: "Invalid input data" });
  }
};
const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({});
    res.status(200).json({ transactions: allTransactions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, msg: "Internal Server Error" });
  }
};
const updateTransaction = async (req, res) => {
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
};
const deleteAllTransactions = async (req, res) => {
  try {
    const result = await Transaction.deleteMany({});
    res.status(200).json({
      message: "All transactions deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting all transactions:", error);
    res.status(500).json({ message: "Failed to delete transactions" });
  }
};
const deleteTransaction = async (req, res) => {
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
};
module.exports = {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  deleteAllTransactions,
  deleteTransaction,
};
