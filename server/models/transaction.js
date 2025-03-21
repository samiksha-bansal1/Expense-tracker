const mongoose = require("mongoose");
//schema
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Income", "Expense"],
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Salary",
      "Groceries",
      "Dining",
      "Transport",
      "Entertainment",
      "Others",
    ],
  },
  description: {
    type: String,
    default: "No description",
  },
  date: {
    type: Date,
    required: true,
  },
});

//model
const Transaction = mongoose.model("transaction", transactionSchema);

module.exports = Transaction;
