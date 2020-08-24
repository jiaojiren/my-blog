<template>
  <div class="container">
    <div class="leftmessage">
      <div class="avatar">
        <img class="avatar-content" src="../assets/avatar.png" />
      </div>
      <div class="name">jiaojiren's blog</div>
      <div class="wechat">
        <span class="iconfont icon-weChat"></span>
        <span class="wechatnumber">15013924224</span>
      </div>
      <div class="email">
        <span class="iconfont icon-email"></span
        ><span class="emailnumber">2420193942@qq.com</span>
      </div>
      <div class="github">
        <span class="iconfont icon-github"></span
        ><a
          href="https://github.com/jiaojiren"
          target="_blank"
          class="githublink"
          >https://github.com/jiaojiren</a
        >
        <div v-for="repo in repos" :key="repo.id" class="repo-info">
          <div>
            <a :href="repo.html_url" class="reponame" target="_blank">
              {{ repo.name }}
            </a>

            <span> Stars: {{ repo.stargazers_count }} </span>
            <span> Watchers: {{ repo.watchers_count }} </span>
            <span> Forks: {{ repo.forks_count }} </span>
          </div>
        </div>
      </div>
      <div class="categories">
        <div>分类专栏</div>
        <div
          v-for="category of categories"
          :key="category.type"
          class="category"
        >
          <div class="category-type" @click="chooseType(category.type)">
            {{ category.type }}
          </div>
          <div class="category-number">{{ category.number }}篇</div>
        </div>
      </div>
    </div>
    <div
      class="articledisplay"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <input
        class="search"
        type="text"
        v-model="keyword"
        @keyup="filte"
        placeholder="输入标题关键字"
      />
      <Article
        :articles="articles"
        @getArticle="getArticle"
        class="articles"
      ></Article>
    </div>
  </div>
</template>

<script>
import Article from "../view/Article";
import debounce from "../utils/debounce";
export default {
  name: "ArticleList",
  components: {
    Article,
  },
  data() {
    return {
      articles: [],
      articledata: [],
      articledata2: [],
      loading: true,
      keyword: "",
      cliendId: "1c325460da2dd33b3f64",
      client_secret: "68c33c2bc26995e4cc2fdec6aa799a3f50201fb7",
      repos: [],
      categories: {},
    };
  },
  methods: {
    getArticles() {
      this.$axios.get("/api/article/all").then((res) => {
        // console.log(res);
        this.articledata = res.data;
        this.articles = this.articledata;
        setTimeout(() => {
          this.loading = false;
        }, 250);
      });
    },
    getArticle(articleID) {
      this.$router.push({ name: "content", params: { articleID } });
    },
    getCategories() {
      this.$axios.get("/api/article/desc").then((res) => {
        this.categories = res.data;
        // console.log(this.categories);
      });
    },
    chooseType(value) {
      // console.log(value);
      this.$axios.get("/api/article/bydesc/" + value).then((res) => {
        this.articledata = res.data;
      });
    },
    filteArticles() {
      //通过防抖筛选文章
      this.articles = this.articledata.filter((value) => {
        //过滤数组元素
        return value.title.includes(this.keyword); //如果包含字符返回true
      });
    },
    filte() {
      if (this.keyword) {
        this.debounced();
      } else {
        this.articles = this.articledata;
      }
    },
  },
  mounted() {
    this.getArticles();
    this.getCategories();
    this.debounced = debounce(this.filteArticles, 500);

    // https://api.github.com/users/username/repos?per_page=count&sort=sort&client_id=clientId&client_secret=clientSecret
    fetch(
      `https://api.github.com/users/jiaojiren/repos?sort=updated&order=asc&client_id=${this.cliendId}&client_secret=${this.client_secret}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.repos = data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  created() {},
};
</script>

<style scoped>
.container {
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: space-around;
  background: linear-gradient(to bottom, #676767 0%, #fff 100%);
  padding: 10px;
  padding-top: 50px;
}
.leftmessage {
  width: 30%;
  /* height: 600px; */
  /* border: #797979 1px solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #dddddd;
}

.avatar {
  width: 80px;
  height: 80px;
  margin: 10px 0;
}
.avatar-content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.name {
  font-size: 24px;
  color: #797979;
}
.wechat {
  margin-top: 10px;
}
.email {
  margin-top: 10px;
}
.github {
  box-sizing: border-box;
  margin-top: 20px;
  width: 100%;
  border-top: #797979 1px solid;
  border-bottom: #797979 1px solid;
  text-align: center;
  padding: 20px 5px 20px 5px;
}
.category {
  margin-top: 10px;
}
.iconfont {
  margin-right: 10px;
}
.wechatnumber {
  color: #797979;
}
.emailnumber {
  color: #797979;
}
.githublink {
  color: #797979;
}
.githublink:hover {
  color: #00a1d6;
}
.repo-info {
  margin-top: 5px;
}
.repo-info span {
  font-size: 12px;
  margin-right: 5px;
  color: #fff;
  line-height: 100%;
}
.reponame {
  font-size: 12px;
  display: inline-block;
  width: 35%;
  color: #797979;
  text-align: left;
}
.reponame:hover {
  color: #00a1d6;
}

.repo-info span:nth-of-type(1) {
  background-color: #00a1d6;
}
.repo-info span:nth-of-type(2) {
  background-color: #656a80;
}
.repo-info span:nth-of-type(3) {
  background-color: #299f41;
}
.categories {
  width: 100%;
  text-align: center;
  margin: 20px;
}
.category {
  display: flex;
  justify-content: space-around;
  margin: 10px;
  margin-left: 30px;
}
.category-type {
  width: 60%;
  text-align: left;
  font-size: 13px;
  color: #797979;
  cursor: pointer;
}
.category-number {
  width: 20%;
  text-align: center;
  font-size: 13px;
  color: #797979;
}
.category-type:hover {
  color: #00a1d6;
}

.search {
  margin: 20px;
  width: 50%;
  box-sizing: border-box;
  height: 30px;
  padding-left: 20px;
  outline: none;
  color: #797979;
  border-radius: 20px;
  box-shadow: inset 8px 8px 35px #ccc, inset -8px -8px 35px #fff;
}
.articles {
  width: 80%;
}
.articledisplay {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  background-color: #dddddd;
}
</style>
