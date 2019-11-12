import Vue from "vue";
import App from "./app.vue";
import router from "./router.js";

// 导入mui
import "./lib/mui/css/mui.css";
import "./lib/mui/css/icons-extra.css";
// 导入自己的样式
import "./css/app.less";

// 导入mui
import MuitUI from "mint-ui";
import "mint-ui/lib/style.min.css";
Vue.use(MuitUI);

// 导入 toast 组件
import { Toast } from "mint-ui";
Vue.prototype.toast = Toast;

// 导入 axios
import axios from "axios";
// 设置公共的路径
axios.defaults.baseURL = "http://www.liulongbin.top:3005/";
Vue.prototype.$axios = axios;

import { Indicator } from "mint-ui";
// 设置 axios 拦截器
//http request 拦截器
axios.interceptors.request.use(
  config => {
    // 请求成功的回调函数
    Indicator.open();
    return config;
  },
  err => {
    // 请求失败的回调函数
    Indicator.close();
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close();
    return response;
  },
  err => {
    Indicator.close();
    return Promise.reject(err);
  }
);

// 导出封装的 axios
import { get, post } from "./utils/api";
Vue.prototype.$http = {
  get,
  post
};

// 导入时间格式化文档
import moment from "moment";

// 导入 vue-preview (点击图片使图片全屏显示插件)
import VuePreview from "vue-preview";
Vue.use(VuePreview);

// 配置全局下的 mui
import mui from "./lib/mui/js/mui.js";
Vue.prototype.mui = mui;

// 导入 vuex,创建数据仓库
import Vuex from "vuex";
Vue.use(Vuex);

// 页面初始化时，取出localStorage中的数据
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

const store = new Vuex.Store({
  state: {
    cart: cart
  },
  mutations: {
    // 1.点击加入购物车,把添加的信息加入到 state 中的cart
    addToCart(state, goodsList) {
      let flag = true;
      // 1.如果购物车中已经存在当前商品，则只是增加数量
      state.cart.some(item => {
        if (item.id == goodsList.id) {
          item.count += parseInt(goodsList.count);
          flag = false;
          return true;
        }
      });
      // 购物车中不存在当前商品，则直接添加
      if (flag) {
        state.cart.push(goodsList);
      }
      // 存储数据
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // 删除指定id的数据
    removeById(state, id) {
      state.cart = state.cart.filter(item => item.id != id);
      // 更新本地缓存
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // 更新状态
    updateSele(state, obj) {
      state.cart.some(item => {
        if (item.id == obj.id) {
          item.flag = obj.sele;
          return true;
        }
      });
      // 更新本地缓存的数据
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    // 更新数量
    changeCount(state, obj) {
      state.cart.some(item => {
        if (item.id == obj.id) {
          item.count = obj.num;
          return true;
        }
      });
      // 更新本地缓存的数据
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  },
  getters: {
    // 根据id获取对应的数量
    /* getCountById(state) {
      let num = {};
      state.cart.forEach(item => {
        num[item.id] = item.count;
      });
      return num;
    },
    // 获取购物车商品的状态
    getStatus(state) {
      let sel = {};
      state.cart.forEach(item => {
        sel[item.id] = item.flag;
      });
      return sel;
    } */

    // 获取对应的数量和商品的状态
    getById(state) {
      let info = {};
      info.num = {};
      info.sele = {};
      state.cart.forEach(item => {
        info.num[item.id] = item.count;
        info.sele[item.id] = item.flag;
      });
      return info;
    }
  }
});

// 定义全局时间过滤器
Vue.filter("time", (date, arg = "YYYY-MM-DD hh:mm:ss") =>
  moment(date).format(arg)
);

new Vue({
  el: "#app",
  data: {},
  render: createEle => createEle(App),
  // 将路由挂载到实例上
  router,
  // 将数据仓库挂载到实例上
  store
});
