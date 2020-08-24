<template>
  <div class="header_title">
    <div class="navbar">
      <div class="visitor">
        <router-link :to="{ path: '/login' }" v-if="!isVisitor"
          >游客登录 <span class="el-icon-user"></span
        ></router-link>
        <div class="visitorlogout" v-if="isVisitor">
          您好!<span @click="visitorLogout">{{ user.email }}</span>
        </div>
      </div>
      <div class="more">
        <router-link to="/"><span>主页</span></router-link>
        <router-link to="/message"><span>留言</span></router-link>
        <span style="cursor:pointer;" @click="manager">管理员</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isVisitor() {
      // 如果游客已登录，返回true
      if (this.user.id && !this.user.manager) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    manager() {
      const token = localStorage.blogtoken;
      if (token) {
        this.$router.push("/admin");
      } else {
        this.$router.push("/login");
      }
    },
    visitorLogout() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem("blogtoken");
          this.$store.dispatch("setUser", {});
          this.$message({
            duration: 600,
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
            duration: 600,
          });
        });
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
.visitor a,
.visitorlogout {
  margin-left: 100px;

  color: #cccccc;
}
.visitorlogout span {
  cursor: pointer;
  margin-left: 5px;
  font-size: 20px;
  color: rgb(241, 117, 117);
  text-decoration: underline;
}
</style>
