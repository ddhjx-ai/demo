
import Vue from 'vue'
import App from './app.vue'
import router from './router.js'

// 导入mui
import  './lib/mui/css/mui.css'
import  './lib/mui/css/icons-extra.css'
// 导入自己的样式
import './css/app.less'

// 导入mui
import MuitUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MuitUI)

// 导入 toast 组件
import { Toast } from 'mint-ui';
Vue.prototype.toast = Toast

// 导入 axios
import axios from 'axios'
// 设置公共的路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$axios = axios

// 导入时间格式化文档
import moment from 'moment'

// 导入 vue-preview (点击图片使图片全屏显示插件)
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 配置全局下的 mui
import mui from "./lib/mui/js/mui.js";
Vue.prototype.mui = mui;

// 定义全局时间过滤器
Vue.filter('time',(date,arg='YYYY-MM-DD hh:mm:ss')=> moment(date).format(arg))

new Vue({
  el:'#app',
  data:{},
  render:createEle => createEle(App),
  // 将路由挂载到实例上
  router,
})