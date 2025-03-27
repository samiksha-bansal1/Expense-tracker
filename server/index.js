const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const transactionRoute = require("./routes/transactions");
const userRoute = require("./routes/user");
const {
  checkForAuthenticationInCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 9000;

// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL || "http://localhost:5173"],
//     credentials: true,
//   })
// );

const allowedOrigins = ["https://expense-tracker-client-eta.vercel.app"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.options("*", cors());

const URL =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/expense-tracker";

//mongo db connection
connectMongoDB(URL)
  .then(() => {
    console.log("Mongo DB connected...");
  })
  .catch((err) => {
    console.log("Error in Mongo DB connection", err);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/user", userRoute);
app.use("/transaction", checkForAuthenticationInCookie, transactionRoute);

//server
app.listen(PORT, () => {
  console.log("server started at PORT", PORT);
});
