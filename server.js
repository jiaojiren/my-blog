const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

mongoose.set("useFindAndModify", false);

// urlencoded解析body中的urlencoded字符， 只支持utf-8的编码的字符,也支持自动的解析gzip和 zlib，
// .json这个方法返回一个仅仅用来解析json格式的中间件，能接受任何body中任何Unicode编码的字符。
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//引入user.js
const user = require("./routes/api/user");
//article.js
const article = require("./routes/api/article");
//comment.js
const comment = require("./routes/api/comment");
//message.js
const Message = require("./routes/api/message");

//DB config
const db = require("./config/keys").mongoURI;

//Connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

app.use(passport.initialize());
require("./config/passport")(passport);

//使用routes
app.use("/api/user", user);
app.use("/api/article", article);
app.use("/api/comment", comment);
app.use("/api/message", Message);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
