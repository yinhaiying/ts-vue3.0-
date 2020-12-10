vue<template>
  <div class="item">
    <h1>生命周期函数</h1>
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <button @click = "increase">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,reactive,toRefs ,onMounted,onUpdated,onRenderTracked} from 'vue';

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default defineComponent({
  name: 'ToRef',
  props: {
    msg: String,
  },
  setup(){
    // const count = ref(0);
    // const increase = () => {
    //   count.value += 1;
    // }
    // const double = computed(() => {
    //   return count.value * 2;
    // })
    onMounted(() => {
      console.log("onMounted");
    })
    onUpdated(() => {
      console.log("onUpdated");
    })
    onRenderTracked((event) => {
      console.log("event;",event)
    })
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => data.count++,
    });
    console.log("1111")
    const refData = toRefs(data)
    return {
      // ...data   得到的不是一个响应式的值，只是普通的js类型
      ...refData
    }
  }
});
</script>

<style lang="less">
  .item{
    margin:30px;
  }
</style>
