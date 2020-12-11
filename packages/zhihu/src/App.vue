<template>
  <div class="container">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import "bootstrap/dist/css/bootstrap.min.css";
const testData: ColumnProps[] = [
  {
    id: 1,
    avatar: "https://pic4.zhimg.com/v2-675b5f63b8fda663cc12cc95aec4f5b6_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 2,
    avatar: "https://pic1.zhimg.com/v2-a8faa37c113eff2c80e01c91dff5890b_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 3,
    avatar: "https://pic1.zhimg.com/v2-56fdabb5e6c6386e61b037261627fc5c_xs.jpg",
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
  {
    id: 4,
    title: "海鹰的专栏",
    description: "这是海鹰的专栏，主要是一些前端相关的工作",
  },
];
export default defineComponent({
  name: "App",
  components: {
    ColumnList,
  },
  setup() {
    return {
      list: testData,
    };
  },
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
