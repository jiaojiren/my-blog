const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "articles",
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
  },
  reply: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      avatar: {
        type: String,
      },
      email: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
});

module.exports = Comment = mongoose.model("comment", CommentSchema);
