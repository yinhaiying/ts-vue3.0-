<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar && column.avatar.fitUrl"
          :alt="column.title"
          class="rounded-circle border w-100"
        />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang = "ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
import PostList from "../components/PostList.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
export default defineComponent({
  name: "ColumnDetail",
  components: {
    PostList,
  },
  setup() {
    const route = useRoute();
    const currentId = +route.params.id;
    const store = useStore<GlobalDataProps>();
    const column = computed(() => {
      const posts = store.state.columns;
      return posts.find((c) => c.id === currentId);
    });
    const list = computed(() => {
      const posts = store.state.posts;
      return posts.filter((post) => post.columnId === currentId);
    });
    return {
      column,
      list,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
