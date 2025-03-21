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

module.exports = {
  createNewTransaction,
};
