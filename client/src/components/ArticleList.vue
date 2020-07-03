<template>
  <div
    class="articledisplay"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <Article :articles="articles" @getArticle="getArticle"></Article>
  </div>
</template>

<script>
import Article from "../view/Article";
export default {
  name: "ArticleList",
  components: {
    Article,
  },
  data() {
    return {
      articles: [],
      loading: true,
    };
  },
  methods: {
    getArticles() {
      this.$axios.get("/api/article/all").then((res) => {
        // console.log(res);
        this.articles = res.data;
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
    getArticle(articleID) {
      this.$router.push({ name: "content", params: { articleID } });
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>

<style scoped></style>
