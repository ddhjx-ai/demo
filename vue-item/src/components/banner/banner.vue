<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in list" :key="i">
        <img :src="item.img?item.img:item.src" alt />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props:['list']
}
</script>

<style lang="less" scoped>
  .mint-swipe {
  height: 270px;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>