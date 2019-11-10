// 导入路由依赖包
import VueRouter from 'vue-router'
import Vue from 'vue'

// 安装路由模块
Vue.use(VueRouter)

// 导入对应的模板
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Cart from './components/tabbar/cart.vue'
import Search from './components/tabbar/search.vue'
import NewsList from "./components/news/newsList.vue"
import NewsInfo from "./components/news/newsInfo.vue"
import ImgList from "./components/imgList/imgList.vue"
import ImgSon from "./components/imgList/imgson.vue"
import Products from "./components/products/products.vue"
import ProductInfo from "./components/products/productInfo.vue"
import ProductCom from "./components/products/productCom.vue"
import ProductDesc from "./components/products/productDesc.vue"

// 创建路由对象,并将路由对象导出
export default  new VueRouter({
  // 配置路由规则
  routes:[
    // 重定向
    {path:'/',redirect:'/home'},
    
    {path:'/home',component:Home},
    {path:'/member',component:Member},
    {path:'/cart',component:Cart},
    {path:'/search',component:Search},
    {path:'/home/newslist',component:NewsList},
    {path:'/home/newsInfo/:id',component:NewsInfo},
    {path:'/home/imgList',component:ImgList},
    {path:'/home/imgson',component:ImgSon},
    {path:'/home/products',component:Products},
    {path:'/home/productInfo',component:ProductInfo},
    {path:'/home/productCom',component:ProductCom},
    {path:'/home/productDesc',component:ProductDesc}
  ],

  // 配置高亮显示
  linkActiveClass:'mui-active'
})