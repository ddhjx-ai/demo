<template>
  <div>
    <!-- 样式来自于MUI的图文列表 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
        <router-link :to="`/home/newsInfo/${item.id}`">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" alt=''/>
          <div class="mui-media-body">
            <h3>{{item.title}}</h3>
            <p>
              <span>发表时间：{{item.add_time | time('YYYY-MM-DD')}}</span>
              <span>点击次数：{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'newsList',
  methods: {
    getNews(){
      this.$axios.get('/api/getnewslist')
        .then(res=>{
          if(res.data.status === 0){
            this.newsList = res.data.message
          }
        })
    }
  },
  data(){
    return {
      newsList:[]
    }
  },
  created(){
    this.getNews()
  },
 /*  filters:{
    time(t){
      let date = new Date(t),
          hh = date.getFullYear(),
          mm = (date.getMonth()+1).toString().padStart(2,'0'),
          dd = (date.getDate()).toString().padStart(2,'0'),

          h = (date.getHours()).toString().padStart(2,'0'),
          m = (date.getMinutes()).toString().padStart(2,'0'),
          s = (date.getSeconds()).toString().padStart(2,'0');
      return `${hh}-${mm}-${dd} ${h}:${m}:${s}`;
    }
  } */
};
</script>

<style lang="less" scoped>
.mui-media-body{
  h3{
    font-size: 14px;
  }
  p{
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: #226aff;
  }
}
</style>