<template>
  <div>
    <RefComputed msg="Welcome to Your Vue.js + TypeScript App"/>
    <ReactiveComp/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RefComputed from './components/ref.vue';
import ReactiveComp from './components/reactive.vue';

export default defineComponent({
  name: 'App',
  components: {
    RefComputed,
    ReactiveComp
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
