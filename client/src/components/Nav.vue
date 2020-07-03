<template>
  <div class="header_title">
    <div class="navbar">
      <div class="avatar"><img src="../assets/avatar.png" alt="" /></div>
      <div class="my"><span>jiaojiren's blog</span></div>
      <div class="more">
        <router-link to="/"><span>主页</span></router-link>
        <span>关于</span>
        <span style="cursor:pointer;" @click="manager">管理员</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
  methods: {
    manager() {
      const token = localStorage.blogtoken;
      if (token) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  height: 60px;
  width: 100%;
  background-color: #575757;
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 20px;
}
img {
  width: 100%;
  height: 100%;
}
.my span {
  font-size: 20px;
  color: #ffffff;
  font-weight: 700;
  margin: 0 20px;
}
.more span {
  font-size: 17px;
  color: #f5f5f5;
  font-weight: 500;
}
.more {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
.more span {
  padding: 0 10px;
}

.more span:nth-child(2) {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
