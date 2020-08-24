const express = require("express");
const router = express.Router();
const Comment = require("../../models/Comment");
const validation = require("../../validation/article");
const passport = require("passport");

//$route GET api/comment/test
//@desc 返回的请求的json数据
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" });
});

//$route Post api/comment/post
//@desc 发布一级评论
//@access public
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      article: req.body.articleid,
      avatar: req.user.avatar,
      email: req.user.email,
    });

    newComment.save().then((post) => res.json(post));
  }
);

//$route Post api/comment/post
//@desc 评论回复
//@access public
router.post(
  "/post/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Comment.findById(req.params.id).then((comment) => {
      const newReply = {
        text: req.body.text,
        user: req.user.id,
        avatar: req.user.avatar,
        email: req.user.email,
      };

      comment.reply.unshift(newReply);

      comment
        .save()
        .then((newcomment) => res.json(newcomment))

        .catch((err) =>
          res.status(404).json({ postnotfound: "添加回复错误！" })
        );
    });
  }
);

//$route Post api/comment/all
//@desc 获取评论
//@access public
router.get("/all/:articleid", (req, res) => {
  Comment.find({ article: req.params.articleid })
    .sort({ date: -1 })
    .then((comments) => res.json(comments))
    .catch((err) =>
      res.status(404).json({ nopostsfound: "找不到任何评论信息" })
    );
});

module.exports = router;
