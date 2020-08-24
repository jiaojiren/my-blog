<template>
  <div>
    <el-table :data="listPart" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            formateDate(scope.row.date)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" width="380">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      tableData: [],
      //刷新页面后每一页有3条数据
      pagesize: 10,
      //刷新页面后当前页为第一页
      currentPage: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleEdit(id) {
      this.$router.push({ name: "new", query: { id: id } });
    },
    handleDelete(id) {
      this.$confirm("是否删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete(`/api/article/${id}`)
            .then((res) => {
              this.getData();
              this.$message({
                type: "success",
                message: "删除成功!",
                duration: 600,
              });
            })
            .catch((res) => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getData() {
      this.$axios
        .get("/api/article/all")
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((reason) => {
          alert(reason);
        });
    },
    handleSizeChange(val) {
      //修改每一页的数据量
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      //修改当前页
      this.currentPage = val;
    },
  },
  computed: {
    listPart() {
      return this.tableData.slice(
        this.pagesize * (this.currentPage - 1),
        this.pagesize * this.currentPage
      );
    },
  },
};
</script>

<style scoped></style>
