#### 1.准备工作

1. webpack.config.js文件中搭建好脚手架
2. npm install package.js中的所有依赖包
3. 创建 index.html 作为打开页面的入口，指定一个区域，作为 MVVM 中的 V
4. 创建 index.js 实例化一个 vm 对象，控制 index.html 的指定区域(也就是V)；
   1. 同时导入项目需要的文件，
   2. 将 router 也挂载到该 vm 实例上
   3. 将该实例在 index.html 指定区域渲染`render:createEle => createEle(App),`
5. 创建 router.js 导入项目所有的路由模块，并配置对应的路由规则，同时导出该路由对象
   1. 由于该路由模块依赖于 Vue ,所以`Vue.use(VueRouter)`
   2. 创建好的路由必须导出，`export default new VueRouter({routes:[路由规则]})`

6. 创建 app.vue 作为所有 vue 路由的主模板，将所有路由在主模板上渲染，同时公共的头部和tabbar部分都渲染在app.vue

### 2.设置公共部分

1. 导入`axios`用来请求动态获取的数据，并且设置公共的路径

```javascript
import axios from 'axios'
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$axios = axios
```

2. 由于模块中多次用到不同的时间格式，通过`moment.js`插件配置全局的时间过滤器

```javascript
import moment from 'moment'
Vue.filter('time',(date,arg='YYYY-MM-DD hh:mm:ss')=> moment(date).format(arg))
```

3. 由于多个页面都引用了评论功能，创建公共的评论组件，在各个模块分别引用
4. 创建轮播图组件，在需要的模块中单独引用

### 3.处理路由

1. 由于app.vue有四个分页，所以分别创建四个路由模块，表示四个分页，在 `router.vue`导出对应模板，同时配置路由规则。
2. 将`home.vue`默认为主页面，所有通过主页跳转的路由模块，配置对应的路由路径，设置为`/home/xxx`与其他页面跳转的路由作为区分

### 4.处理兼容性

在引用mui组件中的横向区域滑动时，出现区域滑动与底部导航栏出现冲突问题，

```javascript
// 报错，可能是严格模式下不能使用mui，可以将严格模式移除 npm install babel-plugin-transform-remove-strict-mode
// .babelrc文件下修改配置{"plugins": ["transform-remove-strict-mode"]}
// import mui from "./lib/mui/js/mui.js";
// Vue.prototype.mui = mui;
```

同时更改底部导航栏的mui类名，自定义一个类名。将原类名下的样式重新设置给新的类名，使其依然保留mui的原有样式。