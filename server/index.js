const express = require("express");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const transactionRoute = require("./routes/transactions");
const userRoute = require("./routes/user");
const {
  checkForAuthenticationInCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = process.env.PORT || 9000;

const cors = require("cors");

const allowedOrigins = [
  process.env.CLIENT_URL || "https://expense-tracker-client-eta.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true, // Allows cookies and credentials
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  if (req.originalUrl.endsWith("/")) {
    return res.redirect(301, req.originalUrl.slice(0, -1));
  }
  next();
});

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Enable cookies and other credentials
// };

// app.use(cors(corsOptions));
// const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   credentials: true,
//   allowedHeaders: "Content-Type,Authorization",
// };

// app.use(cors(corsOptions));

// Handle Preflight Requests Properly
// app.options("*", cors(corsOptions));
// app.use(
//   cors({
//     origin: [process.env.CLIENT_URL || "http://localhost:5173"],
//     credentials: true,
//   })
// );

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.options("*", cors());

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
