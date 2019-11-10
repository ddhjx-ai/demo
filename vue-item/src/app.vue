<template>
  <div class="app_container">
    <!-- 设置头部公共部分 -->
    <mt-header fixed title="shop">
      <mt-button icon="back" slot="left" @click='back'>返回</mt-button>
    </mt-header>

    <!-- 将路由在主模板上渲染 -->
    <transition name="my">
      <router-view></router-view>
    </transition>

    <!-- 跳转路由，tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="my-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="my-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="my-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="my-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name:'app',
  data(){
    return {
      hash:''
    }
  },
  methods: {
    back(){
      window.history.back()
    }
  },
}
</script>

<style lang="less" scoped>
  .mui-bar .mui-bar-tab{
    z-index: 10;
  }

  .my-enter{
    opacity: 0;
    transform: translateX(100%);
  }

  .my-enter-active,
  .my-leave-active{
    transition: all .8s;
  }

  .my-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .app_container{
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
  }

  .mint-header.is-fixed {
    z-index: 10;
  }
  // 
  .mui-bar-tab .my-tab-item
{
    display: table-cell;
    overflow: hidden;

    width: 1%;
    height: 50px;

    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;

    color: #929292;
}
.mui-bar-tab .my-tab-item.mui-active
{
    color: #007aff;
}
.mui-bar-tab .my-tab-item .mui-icon
{
    top: 3px;

    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .my-tab-item .mui-icon ~ .mui-tab-label
{
    font-size: 11px;

    display: block;
    overflow: hidden;

    text-overflow: ellipsis;
}
.mui-bar-tab .my-tab-item .mui-icon:active
{
    background: none;
}
.my-tab-item.mui-plus-hidden, .my-tab-item.mui-wechat-hidden
{
    display: table-cell !important;
}
.mui-plus .my-tab-item.mui-plus-visible, .mui-wechat .my-tab-item.mui-wechat-visible
{
    display: table-cell !important;
}
</style>