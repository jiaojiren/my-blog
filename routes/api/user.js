//@login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

//$route GET api/user/test
//@desc 返回的请求的json数据
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

//$route GET api/user/register
//@desc 注册账号
//@access public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "用户已存在" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      newUser.save((err) => {
        if (err) res.status(400).json(err);
        else {
          res.status(200).json("注册成功");
        }
      });
    }
  });
});

//$route GET api/user/login
//@desc 登录
//@access public
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "用户不存在！" });
    } else if (user.password === req.body.password) {
      const rule = {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        manager: user.manager,
      };
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
