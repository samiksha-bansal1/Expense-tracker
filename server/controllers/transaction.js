const Transaction = require("../models/transaction");

const createNewTransaction = async (req, res) => {
  try {
    // console.log("this is the user:", req.user);
    const userId = req.user.id;
    // console.log(userId);
    const { type, amount, category, description, date } = req.body;
    // console.log(type, amount, category, description, date);
    const newTransaction = await Transaction.create({
      user: userId,
      type,
      amount,
      category,
      description,
      date,
    });
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
    const userId = req.user.id;
    const allTransactions = await Transaction.find({ user: userId });
    res.status(200).json({ transactions: allTransactions });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err, msg: "Internal Server Error" });
  }
};
const updateTransaction = async (req, res) => {
  //   console.log(req.params.id);
  try {
    const userId = req.user.id;
    const transactionId = req.params.id;
    // console.log(transactionId);
    const updatedData = req.body;
    // console.log(updatedData);
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, user: userId },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found or unauthorized" });
    }
    res.status(200).json({
      message: "Transaction updated successfully!",
      updatedTransaction,
    });
  } catch (error) {
    // console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};
const deleteAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    await Transaction.deleteMany({ user: userId });
    res.status(200).json({
      message: "All transactions deleted successfully",
    });
  } catch (error) {
    // console.error("Error deleting all transactions:", error);
    res.status(500).json({ message: "Failed to delete transactions" });
  }
};
const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    // console.log(req.params.id);
    const transactionId = req.params.id;
    const deletedTransaction = await Transaction.findByIdAndDelete({
      _id: transactionId,
      user: userId,
    });
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
