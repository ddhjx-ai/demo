<template>
  <div>
    <h3>{{imgInfo.title}}</h3>
    <p class="box">
      <span>发表时间：{{imgInfo.addtime | time}}</span>
      <span>点击：{{imgInfo.click}}次</span>
    </p>
    <hr />
    <div class="imgBox">
      <!-- <img :src="item.src" alt v-for="(item,i) in imgs" :key="i" /> -->
      <vue-preview :slides="imgs" @close="handleClose"></vue-preview>
    </div>
    <p v-html="imgInfo.content"></p>
    <comment :id="id"></comment>
  </div>
</template>

<script>
import comment from "../comments/comment.vue";
export default {
  name: "imgson",
  data() {
    return {
      imgInfo: {},
      imgs: [],
      id: this.$route.query.id
    };
  },
  methods: {
    getDate() {
      this.$axios.get("/api/getimageInfo/" + this.$route.query.id).then(res => {
        if (res.data.status === 0) {
          this.imgInfo = res.data.message[0];
        }
      });
    },

    getImgs() {
      this.$axios
        .get("/api/getthumimages/" + this.$route.query.id)
        .then(res => {
          if (res.data.status === 0) {
            res.data.message.forEach(item => {
              item.w = 600;
              item.h = 400;
              item.msrc = item.src;
            });
            this.imgs = res.data.message;
          }
        });
    },

    handleClose() {
      console.log("close event");
    }
  },
  created() {
    this.getDate();
    this.getImgs();
  },
  components: {
    comment
  }
};
</script>

<style lang="less" scoped>
hr {
  border: 0;
  border-top: 2px solid #ccc;
}

h3 {
  color: #226aff;
  text-align: center;
  font-size: 18px;
}
p.box {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
</style>