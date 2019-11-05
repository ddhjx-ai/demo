<template>
  <div>
    <router-link to='/login?name=123' tag="button">登陆</router-link>
    <router-link to='/register/123' tag="button">注册</router-link>
    
    <!-- 路由占位 -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name:'app'
  }
</script>

<style>
  h1{
    color: green;
  }
</style>