<template>
  <teleport to = "#loading">
    <div
        class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
        :style = "{'backgroundColor':background || ''}"
        >
        <div class="loading-content">
        <div class="spinner-border text-dark" role="status">
            <!-- <span class="visually-hidden">Loading...</span> -->
        </div>
        <p v-if = "text" class = " small" style = "margin-top:20px">{{text}}</p>
        </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent,onUnmounted } from "vue";
import useDOMCreate from "../hooks/useDOMCreate"
export default defineComponent({
  name: "Loading",
  props:{
      text:{
          type:String
      },
      background:{
          type:String
      }
  },
  setup(){
      useDOMCreate("loading");
  }
});
</script>
<style lang="less" scoped>
.loading-container{
    background:rgba(0,0,0,.5);
    z-index:9999;
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    text-align: center;
}
</style>
