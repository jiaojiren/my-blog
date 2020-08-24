<template>
  <div class="edit_wrap">
    <div class="edit_head">标题</div>
    <el-input v-model="title" placeholder="请输入标题"></el-input>
    <div class="edit_head">简介</div>
    <el-input v-model="desc" placeholder="请输入简介"></el-input>
    <div class="edit_head">内容</div>
    <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
      <el-tab-pane label="编辑" name="first">
        <div class="markdown">
          <textarea class="markdown_input" v-model="content"></textarea>
        </div>
      </el-tab-pane>
      <el-tab-pane label="预览" name="second">
        <div class="markdown">
          <div
            class="markdown_compiled"
            v-html="this.html"
            style="overflow: scroll;"
          ></div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="save_button">
      <el-button type="primary" @click="saveArticle">{{ btn }}</el-button>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
// import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
import "../assets/detailed.css";

export default {
  name: "New",
  data() {
    return {
      title: "",
      activeName: "first",
      content: "",
      html: "",
      isNew: true,
      desc: "",
    };
  },
  computed: {
    btn() {
      return (this.isNew ? "发表" : "更新") + "文章";
    },
  },
  methods: {
    handleClick(name) {
      if (name === "second") {
        this.html = marked(this.content);
      }
    },
    saveArticle() {
      if (this.isNew) {
        this.$axios
          .post("/api/article/new", {
            title: this.title,
            content: this.content,
            desc: this.desc,
          })
          .then((res) => {
            this.$alert("发布成功", "恭喜您!", {
              confirmButtonText: "确定",
            });
          })
          .catch((err) => {
            let error = true;
            if (
              err.response.data.title !== undefined ||
              err.response.data.content !== undefined
            ) {
              error = true;
            } else {
              error = false;
            }

            // console.log(err.response.data.title);
            // console.log(err.response.data.content);
            this.$alert(
              error == true ? "文章标题和内容不能为空" : "",
              "发布失败",
              {
                confirmButtonText: "确定",
              }
            );
          });
      } else {
        // console.log(this.$route.query.id);
        this.$axios
          .post("/api/article/" + this.$route.query.id, {
            title: this.title,
            desc: this.desc,
            content: this.content,
          })
          .then((res) => {
            this.$alert("更改成功", "恭喜您!", {
              confirmButtonText: "确定",
            });
          })
          .catch((err) => {
            let error = true;
            if (
              err.response.data.title !== undefined ||
              err.response.data.content !== undefined
            ) {
              error = true;
            } else {
              error = false;
            }

            // console.log(err.response.data.title);
            // console.log(err.response.data.content);
            this.$alert(
              error == true ? "文章标题和内容不能为空" : "",
              "发布失败",
              {
                confirmButtonText: "确定",
              }
            );
          });
      }
      // this.$router.push('/admin/list')
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
    if (!this.$route.query.id) {
      this.isNew = true;
      this.title = "";
      this.desc = "";
      this.content = "";
    } else {
      this.isNew = false;
      this.$axios.get(`/api/article/${this.$route.query.id}`).then((res) => {
        this.title = res.data.title;
        this.desc = res.data.desc;
        this.content = res.data.content;
      });
    }
  },
};
</script>

<style scoped>
.edit_wrap {
  padding: 20px;
  font-size: 16px;
}
.edit_head {
  margin: 20px 0;
  text-align: left;
}
.edit_wrap textarea {
  outline: none;
  font-size: 16px;
}
.markdown {
  border: 1px solid #bfcbd9;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  height: 800px;
  vertical-align: top;
  background: #f5f7f9;
  overflow: hidden;
  padding: 50px;
}
.markdown textarea {
  border: none;
  resize: none;
}
.markdown_input {
  width: 98%;
  height: 98%;
  background: #f5f7f9;
  padding: 1% 1%;
}
.markdown_compiled {
  width: 98%;
  height: 98%;
  background: #f5f7f9;
  padding: 1% 1%;
}
.save_button {
  padding: 40px 0;
}
</style>
