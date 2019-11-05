<template>
  <div class="login">
    <h1 class="deng">登陆</h1>
    <p>login组件中自己的数据---{{title}}</p>
    <p>路由定义参数---{{this.$route.query}}</p>

    <!-- 3.调用 -->
    <banner :msg='title'></banner>

    <router-link to="/login/person">普通</router-link>
    <router-link to="/login/vip">Vip</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  // 1.导入子模版
  import banner from './public/banner.vue'

  // 相当于在组件中配置相关参数
  export default {
    name:'login',
    data(){
      return {
        title:'我是一个login组件'
      }
    },
    components:{
      // 2.将模板名注册到组件上
      banner:banner
    },
    methods: {
      
    },
  }
</script>

/* 
  1.scope：用来限制自己的样式，不受其它组件的影响
  2.lang='less'：用来设置 less 语法
*/
<style scope lang="less">
  h1{
    color: blue;
  }
  div.login{
    background: skyblue;
    font-size: 20px;
    p{
      color:green;
    }
  }
</style>