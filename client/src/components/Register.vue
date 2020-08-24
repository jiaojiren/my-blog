<template>
  <div class="box">
    <el-input v-model="email" placeholder="请输入邮箱"></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button type="primary" @click="register">注册</el-button>
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
    register: function () {
      this.$axios
        .post("/api/user/register", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          // console.log(res);
          localStorage.setItem("blogtoken", res.data.token);
          this.$router.push("/login");
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
</style>