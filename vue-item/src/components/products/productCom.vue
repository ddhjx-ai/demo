<template>
  <div>
    <comment :id='id'></comment>
  </div>
</template>

<script>
import comment from '../comments/comment.vue'
export default {
  name:'productcom',
  components:{
    comment
  },
  data(){
    return {
      id:this.$route.query.id
    }
  }
}
</script>

<style lang="less" scoped>
  
</style>