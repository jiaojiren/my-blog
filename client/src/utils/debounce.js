// 防抖函数
var debounce = (fn, delay) => {
  let timer = null;
  delay = delay ? delay : 2000;
  return () => {
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay);
  };
};

export default debounce;
