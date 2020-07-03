//@login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");

//$route GET api/user/test
//@desc 返回的请求的json数据
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

//登录验证
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "用户不存在！" });
    } else if (user.password === req.body.password) {
      const rule = { id: user.id, email: user.email };
      jwt.sign(rule, keys.secretOrKey, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } else {
      return res.status(401).json({ password: "密码错误" });
    }
  });
});
router.get("/token", (req, res) => {});

module.exports = router;
