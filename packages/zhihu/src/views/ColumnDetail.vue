<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          :src="column.avatar"
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
import { defineComponent, computed,onMounted } from "vue";
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
    const currentId = route.params.id;
    const store = useStore<GlobalDataProps>();
    const column = computed(() => {
      const item =  store.getters.getColumnById(currentId);
      if(item && !item.avatar){
        item.avatar = "https://ftp.bmp.ovh/imgs/2020/12/5df5dc0ea4a2fd7f.jpg";
      }
      return item;
    });
    const list = computed(() => {
      return store.getters.getPostByCid(currentId);
    });
    onMounted(()=> {
      store.dispatch('fetchColumns');
      store.dispatch('fetchPosts',currentId)
    })
    return {
      column,
      list,
    };
  },
});
</script>
<style lang="less" scoped>
</style>
