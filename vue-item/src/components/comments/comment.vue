<template>
  <div class="cmt_container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入你要评论的内容(最多吐槽100子)" maxlength="100" v-model="msg"></textarea>

    <mt-button @click="postComment" type="primary" size="large">发表评论</mt-button>

    <div class="list">
      <div class="list_item" v-for="(item, i) in comments" :key="item.id">
        <div class="item_title">
          第{{ i+1 }}楼用户 : {{ item.user_name }}
          发表时间 : {{ item.add_time | time }}
        </div>
        <div class="item_content">{{ item.content ? item.content: '66666'}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: ["id"],
  data() {
    return {
      pageindex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$axios
        .get(`api/getcomments/${this.id}?pageindex=${this.pageindex}`)
        .then(res => {
          if (res.data.status === 0) {
            // this.comments = res.data.message;
            // 优化: 拼接数据
            this.comments = this.comments.concat(res.data.message);
          }
        });
    },
    postComment() {
      //非空校验
      if (!this.msg.trim()) {
        return this.toast("内容不能为空");
      }
      /* this.$axios
        .post("api/postcomment/" + this.id, { content: this.msg.trim() })
        .then(res => {
          if (res.data.status === 0) {
            this.getComments();
            this.msg = "";
          }
        }); */
      this.$http.post("api/postcomment/"+this.id,{content:this.msg.trim()}).then(res => {
        this.getComments();
        this.msg = ""
      })
    },
    getMore() {
      this.pageindex++;
      this.getComments();
    }
  }
};
</script>

<style lang="less" scoped>
hr{
  border: 0;
  border-top: 2px solid #ccc;
}
.mint-button--large{
  margin-bottom: 10px;
}
.cmt_container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 80px;
    margin: 0;
  }
  .list {
    margin: 5px 0;
    .list_item {
      font-size: 13px;
      .item_title {
        line-height: 30px;
        background-color: #eeeeee;
      }
      .item_content {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>