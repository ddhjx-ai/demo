<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,i) in imgList" :key="i">
              <img :src="item.src" alt />
            </mt-swipe-item>
          </mt-swipe> -->
          <banner :list='imgList'></banner>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">{{desc.title}}</div>
      </div>
      <div class="mui-card-footer">
        <p>
          市场价：<span>{{desc.market_price}}</span>
          销售价：<span>{{desc.sell_price}}</span>
        </p>购买数量：
        <br />
        <div class="mui-numbox">
          <button class="mui-btn mui-btn-numbox-minus" type="button" @click='minus()'>-</button>
          <input class="mui-input-numbox" type="number" v-model='num' />
          <button class="mui-btn mui-btn-numbox-plus" type="button" @click='add()'>+</button>
        </div>
        <br />
        <br />
        <router-link to='/cart' type="button" class="mui-btn mui-btn-primary" >立即购买</router-link>
        <button type="button" class="mui-btn mui-btn-danger">加入购物车</button>
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
        <router-link :to="'/home/productDesc?id='+this.$route.query.id" type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" tag='button'>图文介绍</router-link>
        <router-link :to="'/home/productCom?id='+this.$route.query.id" type="button" class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined" tag='button'>商品评论</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '../banner/banner.vue'
export default {
  name: "productInfo",
  data() {
    return {
      imgList: [],
      desc: {},
      num:0
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
          console.log(res);
          if (res.data.status === 0) {
            this.desc = res.data.message[0];
          }
        });
    },
    add(){ 
      if(this.num >= this.desc.stock_quantity) {
        this.num = this.desc.stock_quantity
        return this.toast(`抱歉，库存不足！！！`)
      }
      this.num++
    },
    minus(){
      if(this.num <= 0){
        this.num = 0;
        return this.toast('数量不能少于0个')
      }
      this.num--
    }
  },
  created() {
    this.getimgs();
    this.getinfo();
  },
  components:{
    banner
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
    span{
      &:first-child{
        font-size: 12px;
        text-decoration: line-through;
        margin-right: 10px;
      }
      &:last-child{
        color: red;
        font-weight: bold;
        font-size: 15px;
      }
    }
  }
}
.mui-btn-block{
  padding: 8px 0;
}
</style>