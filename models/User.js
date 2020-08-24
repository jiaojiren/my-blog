const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gravatar = require("gravatar");

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
  manager: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

async function createUser() {
  const avatar = gravatar.url("2420193942@qq.com", {
    s: "200",
    r: "pg",
    d: "mm",
  });
  const user = await User.create({
    email: "2420193942@qq.com",
    password: 123,
    manager: true,
    avatar: avatar,
  });
}

// createUser();

module.exports = User;
