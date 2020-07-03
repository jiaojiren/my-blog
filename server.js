const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

mongoose.set("useFindAndModify", false);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//引入user.js
const user = require("./routes/api/user");
//article.js
const article = require("./routes/api/article");

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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
