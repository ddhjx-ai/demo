<template>
  <div>
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min="0" data-numbox-max="">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input  :value="numCount" ref="box" class="mui-input-numbox" type="number" @change="changeVal"/>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['numCount','id'],
  mounted() {
    // 初始化mui
    this.mui('.mui-numbox').numbox()
  },
  methods: {
    changeVal(){
      this.$emit('changNum',parseInt(this.$refs.box.value),this.id)
    }
  },
};
</script>

<style lang="less">
</style>