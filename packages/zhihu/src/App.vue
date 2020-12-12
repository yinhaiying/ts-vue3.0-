<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <router-view></router-view>
    <global-footer></global-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import GlobalHeader from "./components/GlobalHeader.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import { useStore } from "vuex";
import "bootstrap/dist/css/bootstrap.min.css";

export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    GlobalFooter,
  },
  setup() {
    const store = useStore();
    const currentUser = computed(() => store.state.user);
    return {
      user: currentUser,
    };
  },
});
</script>

<style lang="less">
</style>
