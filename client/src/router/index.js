import Vue from "vue";
import Router from "vue-router";

import ArticleList from "../components/ArticleList.vue";
import Content from "../components/Content.vue";
import Login from "../admin/Login.vue";
import Admin from "../admin/Admin.vue";
import New from "../admin/New.vue";
import Edit from "../admin/Edit.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "*", redirect: "/" },
    { path: "/", component: ArticleList },
    { path: "/content/:id", name: "content", component: Content },
    { path: "/login", component: Login },
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
  if (to.path == "/login" || to.path == "/content/:id" || to.path == "/") {
    next();
  } else {
    // console.log(token);
    if (token) {
      next();
      // console.log(token);
    } else {
      next("/login");
    }
  }
});

export default router;
