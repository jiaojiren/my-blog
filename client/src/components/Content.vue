<template>
  <div class="container">
    <div
      class="load"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="detail" v-if="articles">
        <div class="title">
          <div v-if="this.title">{{ title }}</div>
        </div>
        <div class="info">
          <p>作者：jiaojiren</p>
          <p v-if="this.date">发布时间：{{ formateDate(date, true) }}</p>
          <p v-if="this.desc">标签：{{ desc }}</p>
        </div>
        <div class="content"><p v-html="html"></p></div>
      </div>
      <div class="comment-post">
        <el-button type="info" @click="postComment"
          >点击发表评论
          <div class="el-icon-edit-outline"></div
        ></el-button>
        <div class="postarea">
          <el-input
            type="textarea"
            autosize
            placeholder="发表评论"
            v-model="textarea1"
          >
          </el-input>
        </div>
      </div>

      <div class="comments" v-for="(comment, index) of comments" :key="index">
        <div class="comment-num">
          评论<span style="font-size:13px; margin-left:5px;"
            >({{ formateDate(comment.date, true) }})</span
          >
        </div>
        <div class="comment">
          <div class="avatar-container">
            <img :src="comment.avatar" class="avatar" />
          </div>
          <div class="email">{{ comment.email }}：</div>
          <div class="comment-content">
            {{ comment.text }}
          </div>
          <div class="toggleReply" @click="toggleReply(index)">回复</div>
          <div class="reply-post" v-if="index == thisIndex1">
            <el-input
              type="textarea"
              autosize
              placeholder="回复该评论"
              v-model="textarea"
            >
            </el-input>
            <div class="replybutton" @click="postReply(comment._id)">
              发送
            </div>
          </div>
        </div>
        <div class="reply-num" @click="toggleReplyItem(index)">
          查看<span style="color:#ff6c00; margin:2px;">{{
            comment.reply.length
          }}</span
          >条回复
        </div>
        <template v-if="index == thisIndex">
          <div class="reply" v-for="reply in comment.reply" :key="reply._id">
            <div class="avatar-container">
              <img :src="reply.avatar" class="avatar" />
            </div>
            <div class="email">{{ reply.email }}</div>
            <div class="comment-content">
              {{ reply.text }}
            </div>
          </div>
        </template>
      </div>
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
  name: "Content",
  data() {
    return {
      articles: {},
      title: "",
      date: "",
      desc: "",
      content: "",
      loading: true,
      textarea: "",
      textarea1: "",
      comments: {},
      thisIndex: null,
      thisIndex1: null,
    };
  },
  components: {},
  methods: {
    async getOne() {
      const aid = this.$route.params.articleID;
      const res = await this.$axios.get("/api/article/" + aid);
      // console.log(res);
      this.title = res.data.title;
      this.date = res.data.date;
      this.desc = res.data.desc;
      this.content = res.data.content;
      this.loading = false;
    },
    async getComments() {
      const aid = this.$route.params.articleID;
      const res = await this.$axios.get("/api/comment/all/" + aid);
      // console.log(res.data);
      this.comments = res.data;
      this.comments.forEach((item) => {
        item.show = false;
      });
    },
    async postComment() {
      const aid = this.$route.params.articleID;
      const res = await this.$axios.post("/api/comment/post", {
        text: this.textarea1,
        articleid: aid,
      });
      this.textarea1 = "";
      this.getComments();
    },
    async postReply(commentid) {
      const res = await this.$axios.post("/api/comment/post/" + commentid, {
        text: this.textarea,
      });
      this.textarea = "";
      this.getComments();
    },
    toggleReplyItem(index) {
      // for (let i = 0; i < this.comments.length; i++) {
      //   if (this.comments[i] === comment) {
      //     this.comments[i].show = !this.comments[i].show;
      //   }
      // }
      // console.log(this.comments[0]);
      // this.comments.forEach((item) => {
      //   if (item == comment) {
      //     item.show = !item.show;
      //   }
      // });
      if (this.thisIndex == null) {
        this.thisIndex = index;
      } else {
        this.thisIndex = null;
      }
    },
    toggleReply(index) {
      if (this.thisIndex1 == null) {
        this.thisIndex1 = index;
      } else {
        this.thisIndex1 = null;
      }
    },
  },
  mounted() {
    this.getOne();
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
    this.getComments();
  },
  computed: {
    html() {
      // console.log(this.articles.content);
      return marked(this.content);
    },
  },
};
</script>

<style scoped>
.container {
  padding-bottom: 100px;
  margin-bottom: 150px;
  /* overflow: hidden; */
}

.detail {
  padding: 50px;
}
.title {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 30px;
  font-weight: 700;
}
.info {
  background-color: #575757;
  margin: 20px;
  border-radius: 5px;
  padding: 20px 10px;
  color: #eff0dc;
}
.content {
  border: #797979 3px solid;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 5px 5px 6px #797979 inset;
  line-height: 130%;
  font-size: 14px;
}
.load {
  width: 100%;
}
.comment-post {
  margin: 20px;
  margin-left: 60px;
  display: flex;
  align-items: flex-end;
}
.postarea {
  width: 70%;
  margin-left: 10px;
}
.reply-post {
  display: flex;
}
.replybutton {
  width: 70px;
  font-size: 11px;
  color: #797979;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.comments {
  width: 50%;
  border: #797979 3px solid;
  margin-left: 10%;
  margin-bottom: 50px;
  padding: 20px;
}
.comment {
  margin: 10px;
  padding: 5px;
  border: 1px solid;
  border-color: #797979 transparent #797979 transparent;
}
.comment-num {
  font-size: 18px;
  color: #6d757a;
}
.reply-num {
  font-size: 14px;
  color: #6d757a;
  cursor: pointer;
}
.avatar-container {
  width: 50px;
  height: 50px;
  border: #ff6c00 1px solid;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.email {
  font-size: 14px;
  color: #ff6c00;
}
.comment-content {
  font-family: "Helvetica Neue";
  font-size: 14px;
  color: #575757;
  line-height: 200%;
}
.reply {
  margin: 10px;
  padding: 5px;
  margin-left: 30px;
  margin-top: 10px;
  border-top: 1px solid #797979;
}
.toggleReply {
  font-size: 12px;
  cursor: pointer;
  color: #6d757a;
}
.toggleReply:hover {
  color: #00a1d6;
}
</style>
