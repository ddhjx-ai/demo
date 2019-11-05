// 在webpack中配置.vue组件页面的解析
// ① 下载 npm i vue
// ② 导入
// 报错：导入的不是 vue.js
// 解决：导入 vue 完整的路径，不提倡
// import Vue from '../node_modules/vue/dist/vue.js'

import Vue from 'vue'
import App from './app.vue'
import router from './router.js'
import 'bootstrap/dist/css/bootstrap.css'

// 引入mint-ui
/* import 'mint-ui/lib/style.min.css'
import MintUI from 'mint-ui'
Vue.use(MintUI) */

// 按需引入 mint-ui button组件
import { Button,Header } from 'mint-ui';
Vue.component(Button.name, Button);
// 引入 header 组件
Vue.component(Header.name, Header);

// 将需要共享的组件导入到 Vue 的原型上，哪个组件需要调用，就 this.Toast
import {Toast} from 'mint-ui'
Vue.prototype.Toast = Toast

// 在`.vue`组件中使用axios获取数据
import axios from 'axios'
Vue.prototype.$axios=axios

new Vue({
  el:'#app',
  data:{
    msg:'hello world'
  },
  methods: {},

  // 通过 render 函数渲染
  render: (createEle) => createEle(App),

  // 5.挂载到vue实例上
  router
})