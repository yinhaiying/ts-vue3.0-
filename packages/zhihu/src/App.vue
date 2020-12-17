<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <loading text = "加载中"></loading>
    <router-view></router-view>
    <global-footer></global-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed,onMounted } from "vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import Loading from "./components/Loading.vue"
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";
import {GlobalDataProps} from "./store/index";
import axios from "axios";
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    GlobalFooter,
    Loading
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentUser = computed(() => store.state.user);
    const token = computed( () => store.state.token);
    onMounted(() => {
      if(token.value && !currentUser.value.isLogin){
        axios.defaults.headers.common["Authorization"] = token.value;
        store.dispatch('getCurrentUser');
      }
    })
    return {
      user: currentUser,
    };
  },
});
</script>

<style lang="less">
</style>
