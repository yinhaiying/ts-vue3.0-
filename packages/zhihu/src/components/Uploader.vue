<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click.prevent="triggerUpload">
      <span v-if="fileStatus === 'ready'">点击上传</span>
      <span v-else-if="fileStatus === 'loading'">正在上传</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
    </button>
    <input
      type="file"
      class="file-input"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import axios from "axios";
type UploadStatus = "ready" | "loading" | "success" | "error";
type CheckFunc = (file: File) => boolean;
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true,
    },
    beforeUpload: {
      type: Function as PropType<CheckFunc>,
    },
  },
  emits:["file-uploaded","file-uploaded-error"],
  setup(props,context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>("ready");
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        const file =Array.from(target.files)[0];
        if (props.beforeUpload) {
          const result = props.beforeUpload(file);
          if (!result) {
            return;
          }
        }
        if (file) {
          fileStatus.value = "loading";
          const formData = new FormData();
            formData.append("file", file);
            axios
              .post(props.action, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                fileStatus.value = "success";
                context.emit("file-uploaded",res.data);
              })
              .catch((error) => {
                fileStatus.value = "error";
                context.emit("file-uploaded-error",error)
              })
              .finally(() => {
                if (fileInput.value) {
                  fileInput.value.value = "";
                }
              });
        }
      }
    };
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      handleFileChange,
    };
  },
});
</script>
<style lang="less" scoped>
.file-upload {
  .file-input {
    display: none;
  }
}
</style>
