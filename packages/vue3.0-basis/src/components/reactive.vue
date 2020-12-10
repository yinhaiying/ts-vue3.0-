<template>
  <div class="hello">
    <h1>reactive</h1>
    <h1>{{data.count}}</h1>
    <h1>{{data.double}}</h1>
    <button @click = "data.increase">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,reactive } from 'vue';

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default defineComponent({
  name: 'ReactiveComp',
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
    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => data.count++,
    })
    return {
      data
    }
  }
});
</script>

