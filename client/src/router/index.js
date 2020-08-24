import Vue from "vue";
import Router from "vue-router";

import ArticleList from "../components/ArticleList.vue";
import Content from "../components/Content.vue";
import Login from "../admin/Login.vue";
import Admin from "../admin/Admin.vue";
import New from "../admin/New.vue";
import Edit from "../admin/Edit.vue";
import Register from "../components/Register.vue";
import Message from "../components/Message.vue";

import jwt_decode from "jwt-decode";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: ArticleList },
    { path: "/content/:id", name: "content", component: Content },
    { path: "/message", component: Message },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
      path: "/admin",
      component: Admin,
      name: "admin",
      children: [
        { path: "/admin/new", name: "new", component: New },
        { path: "/admin/edit", name: "edit", component: Edit },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.blogtoken;
  if (
    to.path == "/login" ||
    to.path == "/content/:id" ||
    to.path == "/" ||
    to.path == "/register" ||
    to.path == "/message"
  ) {
    next();
  } else {
    // console.log(token);
    let decoded = jwt_decode(token);
    if (token && decoded.manager) {
      next();
      // console.log(token);
    } else {
      next("/login");
    }
  }
});

export default router;
