const Transaction = require("../models/transaction");

const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({});
    res.status(200).json({ transactions: allTransactions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err, msg: "Internal Server Error" });
  }
};

module.exports = {
  getAllTransactions,
};
