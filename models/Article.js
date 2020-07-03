const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: String,
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("article", UserSchema);

async function createArticle() {
  const article = await Article.create({
    title: "测试二",
    desc: "能行吗",
    content: "难搞",
  });
}

// createArticle();

module.exports = Article;
