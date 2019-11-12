<template>
  <div>
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min="0" :data-numbox-max="maxNum">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input @change="foo" value="1" ref='box' class="mui-input-numbox" type="number" />
      <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    // 获取输入框的值，传给父组件
    foo(){
      // 在元素中设置 ref 属性，在 js 中通过 this.$refs 获取对应的 dom 对象
      this.$emit('getNum',this.$refs.box.value)
    }
  },
  props:[
    'maxNum'
  ],
  // 由于商品总数是异步获取的动态数据，所以监听该数据是否被获取到，获取到则渲染到页面中
  watch: {
    maxNum:function(newval,oldVal){
      this.mui('.mui-numbox').numbox().setOption('max',this.maxNum)
    }
  },
  mounted() {
    // 初始化mui
    this.mui('.mui-numbox').numbox()
  },
};
</script>


<style lang="less">
</style>