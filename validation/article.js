const isEmpty = require("./is-empty");
module.exports = (value) => {
  let errors = {};
  if (isEmpty(value.title)) {
    errors.title = "文章标题不能为空";
  }
  if (isEmpty(value.content)) {
    errors.content = "文章内容不能为空";
  }
  return { errors, isValid: isEmpty(errors) };
};
