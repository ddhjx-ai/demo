<template>
  <div>
    <!-- <mt-header fixed title="固定在顶部" ></mt-header> -->
    <h1 @click='show'>person</h1>
    
  </div>
</template>

<script>
// 引入
// import { Toast } from 'mint-ui';
export default {
  name:'person',
  methods: {
    show(){
      this.Toast({
        message:'toast的提示信息',
        duration:2000,
        position:'middle',
        // 若需在文字上方显示一个图标，可以将图标的类名作为 iconClass 的值传给 Toast（图标需自行准备）
        iconClass: 'glyphicon glyphicon-heart'
      })
    },

    getDate(){
      this.$axios.get('http://api.douban.com/v2/seller',{id:123})
        .then(res => {
          console.log(res)
        })
    }
  },

  created() {
    this.getDate()
  },
  
}
</script>