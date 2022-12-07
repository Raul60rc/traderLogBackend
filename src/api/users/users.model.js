const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }, //change type to email.
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  //encrypting the password
  console.log();
  this.password = bcrypt.hashSync(this.password, 10);
  console.log(this.password); // bcrypt not working Console log nor appearing.
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
