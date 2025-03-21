const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const addTransaction = require("./routes/add-transaction");
const getAllTransactions = require("./routes/get-all-transactions");
const deleteTransactions = require("./routes/delete-transaction");
const updatedTransaction = require("./routes/update-transaction");
const deleteAllTransaction = require("./routes/delete-all-transactions");

const app = express();
const PORT = 9000;
app.use(cors());
const URL = "mongodb://127.0.0.1:27017/expense-tracker";

//mongo db connection
connectMongoDB(URL)
  .then(() => {
    console.log("Mongo DB connected...");
  })
  .catch((err) => {
    console.log("Error in Mongo DB connection", err);
  });

app.get("/", (req, res) => {
  //   console.log(req);
  res.send("server started");
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/get-all-transactions", getAllTransactions);
app.use("/add-transaction", addTransaction);
app.use("/delete-transaction", deleteTransactions);
app.use("/update-transaction", updatedTransaction);
app.use("/delete-all-transactions", deleteAllTransaction);

app.listen(PORT, () => {
  console.log("server started at PORT", PORT);
});
