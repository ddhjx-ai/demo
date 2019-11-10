<template>
  <div class="list">
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <a
          class="mui-control-item"
          href="#item2mobile"
          v-for="item in headerList"
          :key="item.id"
          @click="getimages(item.id)"
        >{{item.title}}</a>
      </div>
    </div>
    <ul>
      <router-link v-for="item in imglist" :key="item.id" tag='li' :to="`/home/imgson?id=${item.id}`">
      <!--图片懒加载指令: 为img元素添加v-lazy指令，指令的增量图片的地址。同时需要设置图片在加载时的样式。 -->
        <img v-lazy="item.img_url"/>
        <div>
          <h4>{{item.title}}</h4>
          <p class="warp" v-html="item.zhaiyao"></p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 报错，可能是严格模式下不能使用mui，可以将严格模式移除 npm install babel-plugin-transform-remove-strict-mode
// .babelrc文件下修改配置{"plugins": ["transform-remove-strict-mode"]}，也可以将其配置在全局变量下
// import mui from "../../lib/mui/js/mui.js";

export default {
  name: "imgList",
  data() {
    return {
      headerList: [],
      imglist: []
    };
  },
  created() {
    this.getDate();
    this.getimgs();
  },
  methods: {
    getDate() {
      this.$axios.get("/api/getimgcategory").then(res => {
        if (res.data.status === 0) {
          this.headerList = res.data.message;
          this.headerList.unshift({title:"全部",id:0})
        }
      });
    },

    getimgs() {
      this.$axios.get("/api/getimages/0").then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.imglist = res.data.message;
        }
      });
    },

    getimages(id) {
      this.$axios.get('/api/getimages/'+id).then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.imglist = res.data.message;
        }
      });
    }
  },
  mounted() {
    this.mui(".mui-scroll-wrapper").scroll({});
  }
};
</script>

<style lang="less" scoped>
ul {
  width: 100%;
  padding: 10px;
  margin: 0px;
  li {
    list-style: none;
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    box-shadow: 0 0 5px 0 ;
    img {
      width: 100%;
      display: block;
    }
    img[lazy=loading] {
      width: 100%;
      margin: auto;
    }
    div {
      color: #fff;
      position: absolute;
      bottom: 0;
      p.warp {
        color: #fff;
        width: 100%;
        margin-bottom: 0px;
        overflow: hidden;
        display: -webkit-box; //将对象作为弹性伸缩盒子模型显示  *必须结合的属性*
        -webkit-box-orient: vertical; //设置伸缩盒对象的子元素的排列方式  *必须结合的属性*
        -webkit-line-clamp: 3; //用来限制在一个块元素中显示的文本的行数
        word-break: break-all; //让浏览器实现在任意位置的换行 *break-all为允许在单词内换行*
      }
    }
  }
}
</style>