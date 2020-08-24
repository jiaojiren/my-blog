<template>
  <div id="app">
    <Nav></Nav>
    <router-view style="margin-top:60px; "></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Foot from "./components/Foot";
// import jwt_decode from "jwt-decode";
export default {
  name: "App",
  components: {
    Nav,
    Foot,
  },
  created() {
    if (localStorage.blogtoken) {
      const decoded = this.$decode(localStorage.blogtoken);
      // console.log(decoded);
      // 获取当前时间
      const currentTime = Date.now() / 1000;
      // console.log(currentTime);
      // console.log(decoded.exp);
      //检测token是否过期
      if (decoded.exp < currentTime) {
        localStorage.removeItem("blogtoken");
        this.$store.dispatch("setUser", {});
      } else {
        this.$store.dispatch("setUser", decoded);
      }
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
html,
body {
  width: 100%;
  height: 100%;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: #f5f5f5;
}
img {
  vertical-align: top;
  border: none;
}

.clearf:after,
.clearf:before {
  content: "";
  display: block;
  clear: both;
}

.header_title {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>
