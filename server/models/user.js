const mongoose = require("mongoose");
// const { createHmac, randomBytes } = require("node:crypto");
// const { createTokenForUser } = require("../services/authentication");
const bcrypt = require("bcryptjs");
//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// userSchema.pre("save", function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   const salt = randomBytes(16).toString("hex");

//   const hashedPassword = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");

//   this.salt = salt;
//   this.password = hashedPassword;

//   next();
// });

// userSchema.static(
//   "matchPasswordAndGenerateToken",
//   async function (email, password) {
//     const user = await this.findOne({ email });

//     if (!user) throw new Error("User not found");

//     const salt = user.salt;
//     const hashedPassword = user.password;

//     const userProvidedHash = createHmac("sha256", salt)
//       .update(password)
//       .digest("hex");

//     if (userProvidedHash != hashedPassword) {
//       throw new Error("Incorrect Password");
//     }
//     const token = createTokenForUser(user);
//     return { token, user };
//   }
// );

//model
const User = mongoose.model("user", userSchema);

module.exports = User;
