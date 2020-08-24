const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");
const passport = require("passport");
const validation = require("../../validation/article");

//$route GET api/article/test
//@desc 返回的请求的json数据
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: " works" });
});

//$route GET api/article/all
//@desc 获取所有文章
//@access public
router.get("/all", (req, res) => {
  Article.find()
    .then((article) => {
      if (!article) {
        res.status(404).json({ err: "获取文章失败" });
      }
      res.json(article.reverse());
    })
    .catch((err) => res.status(404).json(err));
});

//$route get api/article/desc
//@desc 获取标签数组
//@access public
router.get("/desc", (req, res) => {
  let result = [];
  let descArr = {};
  Article.find()
    .then((data) => {
      if (data) {
        // res.json(data);
        data.forEach((item) => {
          let index = item.desc;
          if (descArr.hasOwnProperty(index)) {
            descArr[index]++;
          } else {
            descArr[index] = 1;
          }
        });
      }
      for (desc in descArr) {
        let item = { type: desc, number: descArr[desc] };
        result.push(item);
      }
      res.json(result);
    })
    .catch((err) => res.status(404).json(err));
});

//$route get api/article/bydesc
//@desc 根据标签获取文章
//@access public
router.get("/bydesc/:desc", (req, res) => {
  Article.find({ desc: req.params.desc })
    .then((data) => {
      if (data) {
        res.json(data);
      }
    })
    .catch((err) => res.status(404).json(err));
});

//$route GET api/article/new
//@desc 添加文章
//@access private
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    new Article(req.body).save((err) => {
      if (err) res.status(400).json(err);
      else {
        res.status(200).json("成功添加数据");
      }
    });
  }
);

//$route GET api/article/:id
//@desc 获取某一篇文章
//@access public
router.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, data) => {
    if (err) res.json(err);
    else res.status(200).json(data);
  });
});

//$route DELETE api/article/:id
//@desc 删除某一篇文章
//@access private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Article.findByIdAndDelete(req.params.id, (err, data) => {
      if (err) res.json(err);
      else res.status(200).json("success delete");
    });
  }
);

//$route POST api/article/:id
//@desc 更新某一篇文章
//@access private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validation(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Article.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        desc: req.body.desc,
        content: req.body.content,
      },
      // 返回更新后的数据
      // { new: true },
      (err, data) => {
        if (err) res.json(err);
        else res.status(200).json("success update");
      }
    );
  }
);

module.exports = router;
