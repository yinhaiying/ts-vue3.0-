<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt,{Emitter,Handler} from "mitt";
export const emitter: Emitter = mitt();
export default defineComponent({
  name: "ValidateForm",
  emits: ["form-submit"],
  setup(props, context) {
    const callback: Handler = (test: string) => {
      console.log("测试信息:", test);
    };
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
    });
    const submitForm = () => {
      context.emit("form-submit", true);
    };
    return {
      submitForm,
    };
  }
});
</script>
<style lang="less" scoped></style>
