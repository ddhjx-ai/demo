<template>
  <div class="banner">
    <h1>轮播图</h1>
    <p>这是父组件login传过来的数据--{{msg}}</p>
  </div>
</template>

<script>
export default {
  name:'banner',
  props:[
    'msg'
  ],
  created() {
     this.$emit('foo',this.message)
  },
  data(){
    return {
      message:'这是banner中的数据'
    }
  }
}
</script>

<style lang="" scope>
  h1{
    color: purple;
  }
  div.banner{
    background: #aaa;
  }
</style>

