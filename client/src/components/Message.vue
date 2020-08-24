<template>
  <div class="container">
    <div class="title">留言板</div>
    <div class="el-icon-edit">
      <el-input
        class="textarea"
        type="textarea"
        autosize
        placeholder="留下你的足迹吧！"
        v-model="textarea"
      >
      </el-input>
      <el-button type="primary" size="mini" @click="postMessage"
        >发送</el-button
      >
    </div>
    <div v-for="message of messagelist" :key="message._id" class="messagelist">
      <div class="avatar">
        <img class="avatar-content" :src="message.avatar" />
      </div>
      <div class="email">{{ message.email }}</div>
      <div class="date">{{ formateDate(message.date, true) }}</div>
      <div class="text">{{ message.text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messagelist: [],
      textarea: "",
    };
  },
  methods: {
    async getMessage() {
      let message = await this.$axios.get("/api/message/all");
      this.messagelist = message.data;
    },
    async postMessage() {
      await this.$axios.post("/api/message/leave", {
        text: this.textarea,
      });
      this.textarea = "";
      this.getMessage();
    },
  },
  mounted() {
    this.getMessage();
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
}

.el-icon-edit {
  margin: 20px;
  width: 40%;
}

.textarea {
  margin-bottom: 5px;
}

.messagelist {
  margin: 30px;
  padding: 5px;
  border-bottom: #797979 1px solid;
}
.title {
  text-align: center;
  font-family: "Helvetica Neue";
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
}
.avatar {
  width: 50px;
  height: 50px;
  float: left;
  margin-right: 10px;
}
.avatar-content {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.email {
  color: #ff6c00;
  margin-bottom: 20px;
  line-height: 100%;
}
.date {
  color: #797979;
  font-size: 14px;
  line-height: 100%;
}
.text {
  margin: 10px;
  line-height: 140%;
}
</style>
