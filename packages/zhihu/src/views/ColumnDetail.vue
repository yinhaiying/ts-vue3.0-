<template>
  <div class="page">
    <pre>{{ route }}</pre>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "ColumnDetail",
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
