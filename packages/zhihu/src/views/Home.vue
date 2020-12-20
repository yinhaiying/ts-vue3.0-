<template>
  <div class="home-page">
    <div class=" column-top d-flex justify-content-center flex-column align-items-center mb-5">
      <h1 class = "title mb-4">知乎专栏</h1>  
      <h2 class = "sub-title mb-3">随心写作，自由表达</h2>
      <router-link :to = "{name:'createColumn'}" class = "column-btn">申请开通专栏</router-link>
    </div>
    <column-list :list="list"></column-list>
  </div>
</template>
<script lang = "ts">
import { defineComponent, computed,onMounted } from "vue";
import ColumnList from "../components/ColumnList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";

export default defineComponent({
  name: "Home",
  components: {
    ColumnList,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    onMounted(()=> {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns);
    return {
      list: list,
    };
  },
});
</script>
<style lang="less" scoped>
.home-page{
  .column-top{
    .sub-title{
      font-size: 18px;
      color:#121212;
    }
    .column-btn{
      color:#11a668;
      text-decoration:none;
      cursor:pointer;
    }
  }
}
</style>
