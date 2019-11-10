<template>
  <div>
    <h3>{{infoData.title}}</h3>
    <p class="title">
      <span>发表时间：{{infoData.add_time | time()}}</span>
      <span>点击次数：{{infoData.click}}</span>
    </p>
    <hr />
    <div class="info" v-html="infoData.content"></div>

    <comment :id='id'></comment>
  </div>
</template>

<script>
import comment from "../comments/comment.vue";

export default {
  name: "newsInfo",
  data() {
    return {
      infoData: {},
      id:this.$route.params.id
    };
  },
  methods: {
    getInfo() {
      this.$axios.get(`/api/getnew/${this.$route.params.id}`).then(res => {
        if (res.data.status === 0) {
          this.infoData = res.data.message[0];
        }
      });
    }
  },
  created() {
    this.getInfo();
  },
  components:{
    comment
  }
};
</script>

<style lang="less" scoped>
h3 {
  color: red;
  text-align: center;
  font-size: 18px;
  margin:20px 0;
}
p.title {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  color: #226aff;
  padding: 0 10px;
}
hr {
  border: none;
  border-top: 2px solid #ccc;
}

</style>