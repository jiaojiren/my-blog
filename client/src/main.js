import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

//转换时间格式
Vue.prototype.formateDate = function(datetime, boolean) {
  function addDateZero(num) {
    return num < 10 ? "0" + num : num;
  }
  let d = new Date(datetime);
  let formatdatetime;
  let dateone =
    d.getFullYear() +
    "-" +
    addDateZero(d.getMonth() + 1) +
    "-" +
    addDateZero(d.getDate());

  let datetwo =
    addDateZero(d.getHours()) +
    ":" +
    addDateZero(d.getMinutes()) +
    ":" +
    addDateZero(d.getSeconds());
  if (boolean) {
    formatdatetime = dateone + " " + datetwo;
  } else {
    formatdatetime = dateone;
  }
  return formatdatetime;
};

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert("error.response.data");
      localStorage.removeItem("blogtoken");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem("blogtoken");
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
