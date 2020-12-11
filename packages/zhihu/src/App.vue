<template>
  <div class="container">
    <global-header :user="user"></global-header>
    <router-view></router-view>
    <global-footer></global-footer>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from "vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import GlobalFooter from "./components/GlobalFooter.vue";
import "bootstrap/dist/css/bootstrap.min.css";

const currentUser: UserProps = {
  isLogin: true,
  name: "海英斯坦",
};
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    GlobalFooter
  },
  setup() {
    return {
      user: currentUser,
    };
  },
});
</script>

<style lang="less">

</style>
