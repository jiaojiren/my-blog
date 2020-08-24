<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: #a9a9a9">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>管理菜单</template
          >
          <el-menu-item-group>
            <el-menu-item index="1-1" @click="$router.push('/admin/new')"
              >新建文章</el-menu-item
            >
            <el-menu-item index="1-2" @click="$router.push('/admin/edit')"
              >编辑文章</el-menu-item
            >
            <el-menu-item index="1-3" @click="open">退出登录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: center; font-size: 12px">
        <span class="admin_title">管理界面</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Admin",
  methods: {
    logout() {
      localStorage.removeItem("blogtoken");
      this.$router.push("/");
    },
    open() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("blogtoken");
          this.$router.push("/");
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
.el-header {
  background-color: #a9a9a9;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.admin_title {
  font-size: 20px;
  font-weight: bolder;
}
</style>
