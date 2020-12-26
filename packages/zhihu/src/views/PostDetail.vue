<template>
  <div class="page">
      {{post}}
      <h2>111</h2>
  </div>
</template>

<script lang = "ts">
import {defineComponent,onMounted,reactive} from "vue"
import { useStore } from "vuex";
import {GlobalDataProps} from "../store/index";
import {useRoute} from "vue-router"
export default defineComponent({
    name:"PostDetail",
    setup(){
        const store = useStore<GlobalDataProps>();
        const route = useRoute();
        let post;
        onMounted(() => {
            store.dispatch("fetchCurrentPost",route.params.id).then((res) => {
                // console.log("获取文章详情：",res.data)
                // console.log(store.state)
                // post = reactive(res.data);
            })
        });
        return {
            route,
            post:post
        }
    }

})
</script>
<style lang="less" scoped>
</style>