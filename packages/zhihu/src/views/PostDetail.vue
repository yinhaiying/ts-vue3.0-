<template>
  <div class="post-detail" v-if = "post">
    <img :src="post.avatar" alt="" v-if = "post.avatar">
    <h2>{{post.title}}</h2>
    <div class="authore-info">
        {{post.author}}
    </div>
    <div v-html = "post.content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import { useRoute } from "vue-router";
import marked from "marked"
export default defineComponent({
  name: "PostDetail",
  setup() {
    const store = useStore<GlobalDataProps>();
    const route = useRoute();
    const post = computed(() => {
      const result = store.getters.getCurrentPost(route.params.id);
      console.log("result:",result);
      if(result){
        result.content = marked(result.content);
      }
      return result;
    });
    onMounted(() => {
        console.log("mounted")
      store.dispatch("fetchCurrentPost", route.params.id);
    });
    return {
      route,
      post,
    };
  },
});
</script>
<style lang="less" scoped>
.post-detail{
    // display: flex;
    color:#121212;
}
</style>
