<template>
  <div>
    <h3>{{infoData.title}}</h3>
    <hr />
    <div class="desc" v-html="infoData.content"></div>
  </div>
</template>

<script>
export default {
  methods: {
    getdate() {
      this.$axios
        .get("/api/goods/getdesc/" + this.$route.query.id)
        .then(res => {
          if (res.data.status === 0) {
            this.infoData = res.data.message[0];
          }
        });
    }
  },
  data() {
    return {
      infoData : {}
    };
  },
  created() {
    this.getdate()
  },
};
</script>

<style lang="less" scoped>
h3{
  font-size: 18px;
  padding: 10px;
  color:#226aff;
}
hr{
  border: none;
  border: 2px solid #ccc;
}

</style>