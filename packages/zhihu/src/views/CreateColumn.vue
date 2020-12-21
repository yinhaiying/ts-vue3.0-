<template>
  <div class="create-column-page">
    <h4>新建专栏</h4>
    <Uploader
      action="http://api.vikingship.xyz/api/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded="onFileUploaded"
      class="file-upload-wrapper d-flex align-items-center justify-content-center bg-light text-secondary w-100"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <h2>正在上传...</h2>
        </div>
      </template>
      <template v-slot:uploaded="slotProps">
        <div class="uploaded-area">
          <img :src="slotProps.uploadedData.data.url" alt="" />
          <h3>点击重新上传</h3>
        </div>
      </template>
    </Uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="" class="form-label">专栏名称：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="请输入专栏名称"
          type="text"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="" class="form-label">专栏详情：</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          tag="textarea"
          placeholder="请输入一段话介绍专栏"
          rows="5"
        ></validate-input>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary">新建专栏</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { GlobalDataProps, ColumnProps } from "../store/index";
import ValidateForm from "../components/ValidateForm.vue";
import ValidateInput, { RulesProp } from "../components/ValidateInput.vue";
import Uploader from "../components/Uploader.vue";
import { beforeUploadCheck } from "../utils/index";
import createMessage from "../components/createMessage";
export default defineComponent({
  name: "CreateColumn",
  components: {
    ValidateForm,
    ValidateInput,
    Uploader,
  },
  setup() {
    const router = useRouter();
    const store = useStore<GlobalDataProps>();
    const titleRules: RulesProp = [
      { type: "required", message: "文章标题不能为空" },
    ];
    const contentRules: RulesProp = [
      { type: "required", message: "内容不能为空" },
    ];
    const titleVal = ref("");
    const contentVal = ref("");
    const onFormSubmit = (valid: boolean) => {
      if (valid) {
        const { username, columnId } = store.state.user;
        if (columnId && username) {
          const newColumn: ColumnProps = {
            // TODO:avatar
            title: titleVal.value,
            description: contentVal.value,
            columnId,
          };
          store.dispatch("createColumn", newColumn).then((res) => {
            if (res.code == 200) {
              createMessage("创建成功", "success");
              setTimeout(() => {
                router.push({ name: "column", params: { id: columnId } });
              },2000);
            }else{
                createMessage(res.msg, "error");
            }
          });
        }
      }
    };
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        const uploadedFile = files[0];
        // 使用formData进行传输
        const formData = new FormData();
        formData.append(uploadedFile.name, uploadedFile);
        axios
          .post("http://api.vikingship.xyz/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("文件上传：", res);
          });
      }
    };
    const uploadCheck = (file: File) => {
      const { passed, error } = beforeUploadCheck(file, {
        format: ["image/jpeg", "image/png"],
        size: 1,
      });
      if (error === "format") {
        createMessage("上传图片只能是jpg或者png格式", "error");
      } else if (error === "size") {
        createMessage("图片大小不能超过1M", "error");
      }
      return passed;
    };
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      onFormSubmit,
      handleFileChange,
      uploadCheck,
    };
  },
});
</script>
<style lang="less">
.create-column-page {
  .file-upload-wrapper {
    height: 200px;
    cursor: pointer;
    .uploaded-area {
      width: 100%;
      height: 100%;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &:hover {
        h3 {
          display: block;
        }
      }
      h3 {
        display: none;
        position: absolute;
        color: #999;
        text-align: center;
        width: 100%;
        top: 50%;
      }
    }
  }
}
</style>
