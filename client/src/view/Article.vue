<template>
  <div class="articledisplay">
    <div
      v-for="article in articlesPart"
      :key="article._id"
      class="onedisplay"
      @click="reg(article._id)"
    >
      <div class="title">
        <span>{{ article.title }}</span>
      </div>
      <div class="time">
        <span>{{ formateDate(article.date, true) }}</span>
      </div>
      <div class="description">
        <span class="category">标签：</span>
        <span>{{ article.desc }}</span>
      </div>
    </div>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="articles.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  components: {},
  data() {
    return {
      //刷新页面后每一页有3条数据
      pagesize: 3,
      //刷新页面后当前页为第一页
      currentPage: 1,
    };
  },
  props: {
    articles: Array,
  },
  methods: {
    reg(data) {
      this.$emit("getArticle", data);
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
  //自动更新表格里的数据
  computed: {
    articlesPart() {
      return this.articles.slice(
        this.pagesize * (this.currentPage - 1),
        this.pagesize * this.currentPage
      );
    },
  },
};
</script>

<style scoped>
.articledisplay {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
}
.onedisplay {
  width: 80%;
  height: 90px;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
  background-color: #eee;
  border-radius: 10px;
  overflow: hidden;
}
.title {
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.time {
  font-size: 12px;
  width: 100%;
  color: #aaa;
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
}
.description {
  margin-left: 15px;
}
.category {
  margin-right: 10px;
}
</style>
