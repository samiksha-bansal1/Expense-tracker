const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const transactionRoute = require("./routes/transactions");

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

app.use("/", transactionRoute);

app.listen(PORT, () => {
  console.log("server started at PORT", PORT);
});
