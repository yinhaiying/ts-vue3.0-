<template>
  <div style = "display:flex">
    <RefComputed/>
    <ReactiveComp/>
    <ToRefComp/>
    <LifeCycle/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RefComputed from './components/ref.vue';
import ReactiveComp from './components/reactive.vue';
import ToRefComp from './components/toref.vue';
import LifeCycle from "./components/life-cycle.vue"
export default defineComponent({
  name: 'App',
  components: {
    RefComputed,
    ReactiveComp,
    ToRefComp,
    LifeCycle
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
