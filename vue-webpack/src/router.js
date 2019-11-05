// 路由配置

// 1.下载导入路由模块
import Vue from 'vue';
import VueRouter from 'vue-router'

// 2.安装路由到vue中
Vue.use(VueRouter)
// 4.导入路由模块
import login from './components/login.vue'
import register from './components/register.vue'
import Person from './components/login_child/person.vue'
import Vip from './components/login_child/vip.vue'
// 3.创建路由对象
const router = new VueRouter({
  routes:[
    {path:'/login',component:login,children:[
      {path:'person',component:Person},
      {path:'vip',component:Vip}
    ]},
    {path:'/register/:id',component:register},
    {path:'/',redirect:'/login'}
  ]
})

// 把路由暴露出去
export default router