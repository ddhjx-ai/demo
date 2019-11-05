<template>
  <div>
    <h1 class="zhu">注册</h1>
    <p>{{this.$route.params}}</p>

    <banner @foo='show'></banner>

    <i>子组件中传过来的数据----{{data}}</i>
  </div>
</template>

<script>
import banner from './public/banner.vue'
export default {
  name:'register',
  methods: {
    show(data){
        console.log('abc')
        this.data = data
      }
  },
  data(){
    return {
      data:''
    }
  },
  components:{
    banner:banner
  }
}
</script>

<style scope>
  h1{
    color: red;
  }
</style>