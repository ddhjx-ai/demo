<template>
  <div>
    <ul>
      <li v-for="(item,i) in msg" :key="item.id">
        <table>
          <tr>
            <td width='20%'>
              <mt-switch v-model='$store.getters.getById.sele[item.id]' @change="changeSele(item.id,$store.getters.getById.sele[item.id])"></mt-switch>
            </td>
            <td width='20%'>
              <img :src="item.thumb_path" alt />
            </td>
            <td width='50%'>
              <h5>{{item.title}}</h5>
              <span>￥{{item.sell_price}}</span>
              <!-- 数字输入框 -->
              <catnum :numCount="$store.getters.getById.num[item.id]" @changNum="numChange" :id='item.id'></catnum>
            </td>
            <td>
              <a href="#" width="10%" @click.prevent="remove(i,item.id)">删除</a>
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
                <span>{{getNum}} </span>件，总价
                <span>￥{{getTotal}}</span>
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
import catnum from '../comments/cartNum.vue'
export default {
  methods: {
    getData() {
      let ids = []
      this.$store.state.cart.forEach(item => ids.push(item.id))
      this.$axios.get("/api/goods/getshopcarlist/"+ids.join(',')).then(res => {
        if (res.data.status === 0) {
          this.msg = res.data.message; 
        }
      });
    },

    // 删除对应的商品
    remove(i,id){
      // 删除页面的数据
      this.msg.splice(i,1)
      // 删除仓库的数据
      this.$store.commit('removeById',id);
    },

    // 更新商品的选中状态
    changeSele(id,selected){
      // 将状态更新到仓库中
      this.$store.commit('updateSele',{id:id,sele:selected})
    },

    // 更新数量
    numChange(num,id){
      this.$store.commit('changeCount',{num:num,id:id})
    }
  },
  created() {
    this.getData();
    this.numChange()
  },
  data() {
    return {
      msg: [],
      total: 0,
      price:0
    };
  },
  components:{
    catnum
  },
  computed: {
    getNum(){
      let arr = this.$store.state.cart.filter(item => item.flag)
      return arr.reduce((sum,item)=>{
        return sum+=parseInt(item.count)
      },0)
    },
    getTotal(){
      let arr = this.$store.state.cart.filter(item => item.flag)
      return arr.reduce((sum,item)=>{
        return sum+=(item.count*item.price)
      },0)
    }
  },
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