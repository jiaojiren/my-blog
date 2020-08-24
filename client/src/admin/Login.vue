<template>
  <div class="box">
    <el-input v-model="email" placeholder="请输入邮箱"></el-input>
    <el-input
      placeholder="请输入密码"
      v-model="password"
      show-password
    ></el-input>
    <el-button type="primary" @click="login">登录</el-button>
    <div class="toregister">
      没有账号？<router-link :to="{ path: '/register' }">去注册</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      this.$axios
        .post("/api/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          localStorage.setItem("blogtoken", res.data.token);
          let decoded = this.$decode(localStorage.blogtoken);
          this.$store.dispatch("setUser", decoded);
          if (decoded.manager) {
            this.$router.push("/admin");
          } else {
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style scoped>
.box {
  width: 30%;
  top: 40px;
  margin: 40px auto;
  text-align: center;
}
.el-input {
  margin: 20px;
}
.toregister {
  position: relative;
  margin-top: 20px;
  left: 25px;
  color: #aaaaaa;
}
.toregister a {
  color: #409eff;
  text-decoration: underline;
}
</style>
