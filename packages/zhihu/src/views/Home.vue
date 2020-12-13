<template>
  <div class="page">
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
    const list = computed(() => store.state.columns);
    onMounted(() => {
      store.dispatch("fetchColumns");
    })
    return {
      list: list,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
