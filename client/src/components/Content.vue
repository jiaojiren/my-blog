<template>
  <div class="detail">
    <h1>{{ title }}</h1>
    <p>{{ formateDate(date, true) }}</p>
    <p>{{ desc }}</p>
    <p v-html="html"></p>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/atom-one-light.css";

export default {
  name: "Content",
  data() {
    return {
      content: "",
      desc: "",
      title: "",
      date: "",
    };
  },
  components: {},
  methods: {
    async getOne() {
      const aid = this.$route.params.articleID;
      const res = await this.$axios.get("/api/article/" + aid);
      // console.log(res);
      this.title = res.data.title;
      this.desc = res.data.desc;
      this.content = res.data.content;
      this.date = res.data.date;
    },
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });

    this.getOne();
  },
  computed: {
    html() {
      return marked(this.content);
    },
  },
};
</script>

<style>
.detail {
  padding: 50px;
}
</style>
