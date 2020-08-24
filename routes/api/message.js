const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");
const passport = require("passport");
const { route } = require("./user");

//$route GET api/message/test
//@desc 返回的请求的json数据
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

//$route post api/message/leave
//@desc 写入留言
//@access private
router.post(
  "/leave",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newMessage = new Message({
      user: req.user.id,
      text: req.body.text,
      email: req.user.email,
      avatar: req.user.avatar,
    });
    newMessage.save().then((post) => res.json(post));
  }
);

//$route get api/message/all
//@desc 获取留言
//@access public
router.get("/all", (req, res) => {
  Message.find()
    .sort({ date: -1 })
    .then((messages) => res.json(messages))
    .catch((err) => res.status(404).json({ nopostsfound: "找不到留言" }));
});

module.exports = router;
