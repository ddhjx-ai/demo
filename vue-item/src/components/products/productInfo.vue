<template>
  <div>
    <transition @before-enter="before" @enter="enter" @after-enter="after">
      <div @transitionend="end" class="ball" v-show="flag" ></div>
    </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in imgList" :key="i">
              <img :src="item.src" alt />
            </mt-swipe-item>
          </mt-swipe>-->
          <banner :list="imgList" :flag="false"></banner>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">{{desc.title}}</div>
      </div>
      <div class="mui-card-footer">
        <p>
          市场价：
          <span>{{desc.market_price}}</span>
          销售价：
          <span>{{desc.sell_price}}</span>
        </p>购买数量：
        <br />
          <number :maxNum='desc.stock_quantity'  @getNum="getCount"></number>
        <br />
        <br />
        <router-link to="/cart" type="button" class="mui-btn mui-btn-primary">立即购买</router-link>
        <button type="button" class="mui-btn mui-btn-danger" @click="addCart">加入购物车</button>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{desc.goods_no}}</p>
          <p>库存情况：{{desc.stock_quantity}}</p>
          <p>上架时间：{{desc.add_time | time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <router-link
          :to="'/home/productDesc?id='+this.$route.query.id"
          type="button"
          class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined"
          tag="button"
        >图文介绍</router-link>
        <router-link
          :to="'/home/productCom?id='+this.$route.query.id"
          type="button"
          class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined"
          tag="button"
        >商品评论</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "../banner/banner.vue";
import number from "../comments/number.vue"
export default {
  name: "productinfo",
  data() {
    return {
      imgList: [],
      desc: {},
      flag: false,
      // 设置节流阀，防止一次动画未执行完毕，多次点击
      mark: false,
      count:1
    };
  },
  methods: {
    getimgs() {
      this.$axios
        .get("/api/getthumimages/" + this.$route.query.id)
        .then(res => {
          if (res.data.status === 0) {
            this.imgList = res.data.message;
          }
        });
    },
    getinfo() {
      this.$axios
        .get("/api/goods/getinfo/" + this.$route.query.id)
        .then(res => {
          if (res.data.status === 0) {
            this.desc = res.data.message[0];
          }
        });
    },
    // 定义方法，获取子组件中的数量
    getCount(counts){
      this.count = counts;
    },
    addCart() {
      let goodsList = {
        id:this.$route.query.id,
        count:parseInt(this.count),
        flag:true,
        price:parseInt(this.desc.sell_price)
      }
      // 触发 store 中的方法
      this.$store.commit('addToCart',goodsList)

      // before函数 表示动画执行之前，此时动画尚未开始，可以在该函数中可以设置动画开始的起始样式
      if(this.mark) return
      this.mark = true;
      this.flag = !this.flag;

      // this.$store.getters.getNumber
    },
    // 控制小球动画
    before(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetHeight;
      // 通过dom.getBoundingClientRect() 动态获取基于窗口的坐标
      // 获取小球起始和终止位置的坐标
      let start = el.getBoundingClientRect();
      let stop = document.querySelector(".mui-badge").getBoundingClientRect();
      let x = stop.left - start.left;
      let y = stop.top - start.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all 1s cubic-bezier(0.54,-0.14, 1, 0.34)";
      done();
    },
    after() {
      this.flag = !this.flag
    },
    // transitionend 或 animationend;过渡完成后，设置相应的事件监听器。
    end() {
      this.mark = false
    }
  },
  created() {
    this.getimgs();
    this.getinfo();
  },
  components: {
    banner,
    number
  }
};
</script>

<style lang="less" scoped>
.mint-swipe {
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
.mui-card-footer {
  display: block;
  p {
    width: 100%;
    font-size: 13px;
    span {
      &:first-child {
        font-size: 12px;
        text-decoration: line-through;
        margin-right: 10px;
      }
      &:last-child {
        color: red;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
}
.mui-btn-block {
  padding: 8px 0;
}
.ball {
  width: 15px;
  height: 15px;
  background: red;
  border-radius: 50%;
  position: absolute;
  z-index: 10000;
  top: 540px;
  left: 150px;
}
</style>