<template>
  <div class="hello">
    <h1>ref</h1>
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <button @click = "increase">+</button>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref,computed } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(){
    const count = ref(0);
    const increase = () => {
      count.value += 1;
    }
    const double = computed(() => {
      return count.value * 2;
    })
    return {
      count,
      increase,
      double
    }
  }
});
</script>

