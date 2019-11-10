<template>
  <div>
    <ul>
      <li v-for="item in msg" :key="item.id">
        <table>
          <tr>
            <td width='20%'>
              <div class="mui-switch mui-switch-mini">
                <div class="mui-switch-handle"></div>
              </div>
            </td>
            <td width='20%'>
              <img :src="item.thumb_path" alt />
            </td>
            <td width='60%'>
              <h5>{{item.title}}</h5>
              <span>￥{{item.sell_price}}</span>
              <div class="mui-numbox">
                <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                <input class="mui-input-numbox" type="number" :value="item.cou" />
                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </td>
          </tr>
        </table>
      </li>
      <li>
        <table>
          <tr>
            <td>
              <p>总计(不含运费)</p>
              <p>
                已勾选商品
                <span>{{total}} </span>件，总价
                <span>￥{{price}}</span>
              </p>
            </td>
            <td>
              <button type="button" class="mui-btn mui-btn-danger">去结算</button>
            </td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    getData() {
      this.$axios.get("/api/goods/getshopcarlist/87,88,89").then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.msg = res.data.message;
        }
      });
    }
  },
  created() {
    this.getData();
  },
  data() {
    return {
      msg: [],
      total: 0,
      price:0
    };
  }
};
</script>

<style lang="less" scoped>
ul {
  width: 100%;
  padding: 0;
  margin: 0;
  background: #ddd;
  li {
    width: 100%;
    list-style: none;
    padding: 15px;
    padding-bottom: 0;
    background-clip: content-box;
    background-color: #fff;
    overflow: hidden;
    &:last-child {
      padding: 15px;
      p {
        margin: 0 30px 0 10px;
        line-height: 30px;
        span {
          font-size: 15px;
          font-weight: bold;
          color: red;
        }
      }
    }
    &:not(:last-child) {
      table {
        width: 100%;
        tr {
          width: 100%;
          td {
            padding: 5px;
            h5 {
              font-weight: bold;
              color: #000;
            }
            span {
              font-size: 12px;
              font-weight: bold;
              color: red;
            }
          }
        }
      }
    }
  }
}
img {
  height: 60px;
}
</style>