<template>
  <div class="dropdown">
    <a
      href="#"
      class="btn btn-outline-light my-2 dropdown-toggle"
      @click.prevent="toggleOpen"
      >{{ title }}</a
    >
    <div class="dropdown-menu" style="display: block" v-if="isOpen">
      <a class="dropdown-item" href="#">新建文章</a>
      <a class="dropdown-item" href="#">编辑资料</a>
    </div>
  </div>
</template>

<script lang = "ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    return {
      isOpen,
      toggleOpen,
    };
  },
});
</script>

<style>
</style>
