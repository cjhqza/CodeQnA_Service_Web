<template>
    <div>
      <span style="width: 100px;">已发送({{ time }})</span>
    </div>
  </template>
  
  <script setup lang='ts'>
  // 引入组合式API函数ref
  import { ref, watch } from 'vue';
  // 倒计时的事件
  let time = ref<number>(5);
  // 接受父组件传递过来的props->flag：用于控制计数器组件显示与隐藏
  let props = defineProps(["flag"]);
  let $emit = defineEmits(['getFlag']);
  // 监听父组件传递过来props数据变化
  watch(
    () => props.flag,
    () => {
      // 开启定时器
      let timer = setInterval(() => {
        time.value--;
        if (time.value == 0) {
          // 通知父组件倒计时模式结束
          $emit('getFlag', false);
          // 清除定时器
          clearInterval(timer);
        }
      }, 1000);
    },
    {
      immediate: true
    }
  );
  </script>
  
<style scoped lang="scss">
</style>