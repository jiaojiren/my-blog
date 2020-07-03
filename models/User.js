const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

async function createUser() {
  const user = await User.create({
    email: "123@qq.com",
    password: 123,
  });
}

// createUser();

module.exports = User;
