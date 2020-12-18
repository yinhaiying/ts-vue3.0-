<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind = "$attrs">
      <slot v-if="fileStatus === 'ready'" name = "default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
      <slot v-else-if="fileStatus === 'loading'" name = "loading">
        <button class="btn btn-primary">正在上传</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name = "uploaded" :uploadedData = "uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus === 'error'" name = "errorUploaded">
        <button class="btn btn-error">上传失败</button>
      </slot>
    </div>
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
  inheritAttrs:false,
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
    const uploadedData = ref();
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
                uploadedData.value = res.data;
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
      uploadedData
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
