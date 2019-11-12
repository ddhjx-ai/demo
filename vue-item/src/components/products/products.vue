<template>
  <div class="imgbox">
    <ul>
      <li v-for="item in productList" :key="item.id">
        <!-- <router-link :to="'/home/productInfo?id='+item.id" tag='a'>
          <img :src="item.img_url" alt="图片未找到"/>
          <h5>{{item.title}}</h5>
        </router-link> -->
        <a @click="goTo(item.id)" tag='a'>
          <img :src="item.img_url" alt="图片未找到"/>
          <h5>{{item.title}}</h5>
        </a>
        <div>
          <p>
            <span>￥{{item.sell_price}}</span>
            <span>￥{{item.market_price}}</span>
          </p>
          <p>
            热卖中
            <span>剩余{{item.stock_quantity}}</span>
          </p>
        </div>
      </li>
    </ul>
    <mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "products",
  data() {
    return {
      pageindex: 1,
      productList: []
    };
  },
  methods: {
    getDate() {
      this.$axios.get("/api/getgoods?pageindex=" + this.pageindex).then(res => {
        if (res.data.status === 0) {
          this.productList = res.data.message;
        }
      });
    },
    getmore() {
      this.pageindex++
      this.$axios.get("/api/getgoods?pageindex=" + this.pageindex).then(res => {
        if (res.data.status === 0) {
          this.productList = this.productList.concat(res.data.message)
        }
      });
    },

    goTo(id){ // 点击跳转到详情页面,通过$router对象
      // 方法一：直接传路由地址
      // this.$router.push('/home/productInfo?id='+id)
      // 方法二：传递路由地址对象
      // this.$router.push({path:'/home/productInfo?id='+id})
      // 方法三：带查询参数,path后面是跳转的页面的name名,query和params的方式不同
      this.$router.push({path:'productinfo',query:{id:id}})
    }
  },
  created() {
    this.getDate();
  }
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}

.imgbox {
  padding: 10px;
}
ul {
  width: 100%;
  overflow: hidden;
  li {
    list-style: none;
    box-shadow: 0 0 5px -1px;
    width: calc(50% - 5px);
    border: 1px solid #ccc;
    float: left;
    margin-bottom: 10px;
    &:nth-child(odd) {
      margin-right: 5px;
    }
    &:nth-child(even) {
      margin-left: 5px;
    }
    a {
      display: inline-block;
      width: 100%;
      padding-bottom: 50px;
      position: relative;
      h5 {
        color: #000;
        position: absolute;
        font-weight: bold;
        bottom: 5px;
        left: 0;
        width: 100%;
      }
      img {
        width: 100%;
      }
    }
    div {
      width: 100%;
      background-color: #ddd;
      p {
        margin-left: 15px;
        line-height: 22px;
        &:nth-child(1) {
          span {
            margin-right: 10px;
            &:nth-child(1) {
              font-size: 15px;
              font-weight: bold;
              color: red;
            }
            &:nth-child(2) {
              font-size: 12px;
              color: #aaa;
              text-decoration: line-through;
            }
          }
        }
        &:nth-child(2) {
          font-size: 12px;
          position: relative;
          span {
            color: #aaa;
            position: absolute;
            right: 10px;
          }
        }
      }
    }
  }
}
</style>